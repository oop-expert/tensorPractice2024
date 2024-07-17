from django.contrib import admin
from .models import Room, Player, Question, Prompt


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'room', 'answer')
    search_fields = ('answer',)


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'room', 'is_host', 'is_ready', 'score', 'created_at',)
    search_fields = ('name',)


class PlayerInline(admin.TabularInline):
    model = Player


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'code', 'is_started',)
    search_fields = ('name',)
    inlines = [PlayerInline]


@admin.register(Prompt)
class PromptAdmin(admin.ModelAdmin):
    list_display = ('id', 'text', 'answer')
    search_fields = ('text', 'answer')
