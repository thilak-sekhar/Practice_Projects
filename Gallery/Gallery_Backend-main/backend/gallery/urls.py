from django.urls import path
from .views import UnlockView, MediaListView, UploadView

urlpatterns = [
    path("unlock/", UnlockView.as_view(), name="unlock"),
    path("media/", MediaListView.as_view(), name="media-list"),
    path("upload/", UploadView.as_view(), name="upload"),
]
