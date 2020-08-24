from rest_framework import serializers
from .models import Player


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ("year", "name", "team", "position", "position_rank", "rush_attempts", "rush_yards",
                  "yards_per_rush", "rush_touchdowns", "rushes_per_touchdown", "fumbles", "pass_attempts",
                  "pass_completions", "completion_percentage", "pass_yards", "yards_per_pass_attempt",
                  "yards_per_completion", "pass_touchdowns", "passes_per_touchdown", "interceptions", "targets",
                  "receptions", "catch_percentage", "receiving_yards", "yards_per_reception", "yards_per_target",
                  "receiving_touchdowns", "receptions_per_touchdown", "targets_per_touchdown", "total_attempts",
                  "total_yards", "yards_per_attempt", "total_touchdowns", "attempts_per_touchdown", "games",
                  "attempts_per_game", "points", "points_per_game", "points_per_attempt",
                  "average_value_over_replacement", "starting_value_over_replacement")
