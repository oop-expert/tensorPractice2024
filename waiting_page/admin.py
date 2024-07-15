from django.contrib import admin
from .models import Room, Player


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'room', 'is_admin', 'is_ready', 'score', 'combo', 'created_at', )
    search_fields = ('name', )
    
    
class PlayerInline(admin.TabularInline):
    model = Player


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'is_started', )
    search_fields = ('name', )
    inlines = [PlayerInline]
