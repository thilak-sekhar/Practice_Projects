from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MediaFile
from .serializers import MediaFileSerializer
import cloudinary.uploader

# Helper: session check
def is_authenticated(request):
    return request.session.get("authenticated", False)

class UnlockView(APIView):
    def post(self, request):
        password = request.data.get("password")
        if password == settings.GALLERY_PASSWORD:
            request.session["authenticated"] = True
            request.session.save()
            return Response({"message": "Unlocked!"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid password"}, status=status.HTTP_401_UNAUTHORIZED)

class MediaListView(APIView):
    def get(self, request):
        if not is_authenticated(request):
            return Response({"error": "Unauthorized"}, status=401)

        # Run sync automatically before returning images
        from gallery.management.commands.sync_cloudinary import Command
        Command().handle()

        media = MediaFile.objects.order_by("-created_at")
        serializer = MediaFileSerializer(media, many=True)
        return Response(serializer.data)

class UploadView(APIView):
    def post(self, request):
        if not is_authenticated(request):
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        files = request.FILES.getlist("files")
        if not files:
            return Response({"error": "No files uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        uploaded = []
        for f in files:
            res = cloudinary.uploader.upload(f, resource_type="image")
            media = MediaFile.objects.create(
                filename=f.name,
                url=res["secure_url"]
            )
            uploaded.append(media)

        serializer = MediaFileSerializer(uploaded, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
