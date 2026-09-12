from django.core.management.base import BaseCommand
from gallery.models import MediaFile
import cloudinary.api
import re

class Command(BaseCommand):
    help = "Sync MediaFile DB with Cloudinary. Removes DB records for missing images."

    def handle(self, *args, **kwargs):
        media_files = MediaFile.objects.all()
        removed_count = 0

        for media in media_files:
            # Extract public_id from URL
            # Example URL: https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/myfolder/myimage.jpg
            match = re.search(r'/upload/(?:v\d+/)?(.+)\.(jpg|png|jpeg|gif)$', media.url)
            if not match:
                self.stdout.write(f"Could not extract public_id for {media.filename}")
                continue

            public_id = match.group(1)

            try:
                # Check if resource exists
                cloudinary.api.resource(public_id, resource_type="image")
            except cloudinary.exceptions.NotFound:
                # Delete DB record
                media.delete()
                removed_count += 1
                self.stdout.write(f"Removed DB record for missing image: {media.filename}")

        self.stdout.write(self.style.SUCCESS(f"Sync completed. Removed {removed_count} records."))
