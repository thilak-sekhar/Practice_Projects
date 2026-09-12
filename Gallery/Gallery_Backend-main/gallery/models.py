from django.db import models

class MediaFile(models.Model):
    filename = models.CharField(max_length=255, blank=True, null=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.filename
