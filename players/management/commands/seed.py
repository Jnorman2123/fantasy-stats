from django.core.management.base import BaseCommand
from players.models import Player
import requests

res = requests.get(
    "https://www.fantasyfootballdatapros.com/api/players/2019/all")

players = []


if res.ok:
    data = res.json()
    for player in data:
        if player.get("position") != "0":
            points = round((
                player.get("stats").get("passing").get("passing_td")*4 +
                player.get("stats").get("passing").get("passing_yds")*.04 +
                player.get("stats").get("rushing").get("rushing_td")*6 +
                player.get("stats").get("rushing").get("rushing_yds")*.10 +
                player.get("stats").get("receiving").get("receiving_yds")*.10 +
                player.get("stats").get("receiving").get("receiving_td")*6 +
                player.get("stats").get("receiving").get("receptions") -
                player.get("fumbles_lost")*2 -
                player.get("stats").get("passing").get("int")*2
            ), 2)

            points_per_game = round((points/player.get("games_played")), 2)

            total_att = player.get("stats").get("passing").get(
                "passing_att") + player.get("stats").get("rushing").get("rushing_att") + player.get("stats").get("receiving").get("targets")

            total_yards = player.get("stats").get("passing").get("passing_yds") + player.get("stats").get(
                "rushing").get("rushing_yds") + player.get("stats").get("receiving").get("receiving_yds")

            total_td = player.get("stats").get("passing").get(
                "passing_td") + player.get("stats").get("rushing").get("rushing_td") + player.get("stats").get("receiving").get("receiving_td")

            if total_att > 0:
                yards_per_att = round((total_yards/total_att), 2)

                att_per_game = round((total_att/player.get("games_played")), 2)

                points_per_att = round((points/total_att), 2)
            else:
                yards_per_att = 0
                att_per_game = 0
                points_per_att = 0

            if total_att > 0 and total_td > 0:
                att_per_td = round((total_att/total_td), 2)
            else:
                att_per_td = 0

            if player.get("stats").get("passing").get("passing_att") > 0 and player.get("stats").get("passing").get("passing_cmp") > 0:
                completion_percentage = round((
                    player.get("stats").get("passing").get("passing_cmp") /
                    player.get("stats").get("passing").get("passing_att") * 100
                ), 2)

                yards_per_pass = round((
                    player.get("stats").get("passing").get("passing_yds") /
                    player.get("stats").get("passing").get("passing_att")
                ), 2)

                yards_per_comp = round((
                    player.get("stats").get("passing").get("passing_yds") /
                    player.get("stats").get("passing").get("passing_cmp")
                ), 2)
            else:
                completion_percentage = 0
                yards_per_pass = 0
                yards_per_comp = 0

            if player.get("stats").get("passing").get("passing_att") > 0 and player.get("stats").get("passing").get("passing_td") > 0:
                pass_per_touchdown = round((
                    player.get("stats").get("passing").get("passing_att") /
                    player.get("stats").get("passing").get("passing_td")
                ), 2)
            else:
                pass_per_touchdown = 0

            if player.get("stats").get("rushing").get("rushing_att") > 0:
                yards_per_rush = round((
                    player.get("stats").get("rushing").get("rushing_yds") /
                    player.get("stats").get("rushing").get("rushing_att")
                ), 2)
            else:
                yards_per_rush = 0

            if player.get("stats").get("rushing").get("rushing_att") > 0 and player.get("stats").get("rushing").get("rushing_td") > 0:
                rush_per_touchdown = round((
                    player.get("stats").get("rushing").get("rushing_att") /
                    player.get("stats").get("rushing").get("rushing_td")
                ), 2)
            else:
                rush_per_touchdown = 0

            if player.get("stats").get("receiving").get("targets") > 0 and player.get("stats").get("receiving").get("receptions") > 0:
                catch_percentage = round((
                    player.get("stats").get("receiving").get("receptions") /
                    player.get("stats").get("receiving").get("targets") * 100
                ), 2)

                yards_per_reception = round((
                    player.get("stats").get("receiving").get("receiving_yds") /
                    player.get("stats").get("receiving").get("receptions")
                ), 2)

                yards_per_target = round((
                    player.get("stats").get("receiving").get("receiving_yds") /
                    player.get("stats").get("receiving").get("targets")
                ), 2)
            else:
                catch_percentage = 0
                yards_per_reception = 0
                yards_per_target = 0

            if player.get("stats").get("receiving").get("receptions") > 0 and player.get("stats").get("receiving").get("receiving_td") > 0:
                receptions_per_td = round((
                    player.get("stats").get("receiving").get("receptions") /
                    player.get("stats").get("receiving").get("receiving_td")
                ), 2)

                targets_per_td = round((
                    player.get("stats").get("receiving").get("targets") /
                    player.get("stats").get("receiving").get("receiving_td")
                ), 2)
            else:
                receptions_per_td = 0
                targets_per_td = 0

            if total_att > 0 and total_td > 0:
                att_per_game = round((total_att/player.get("games_played")), 2)

                points_per_att = round((points/total_att), 2)

                att_per_td = round((total_att/total_td), 2)
            else:
                att_per_game = 0
                points_per_att = 0
                att_per_td = 0

            players.append({
                "year": 2019,
                "name": player.get("player_name"),
                "team": player.get("team"),
                "position": player.get("position"),
                "rush_attempts": player.get("stats").get(
                    "rushing").get("rushing_att"),
                "rush_yards": player.get("stats").get(
                    "rushing").get("rushing_yds"),
                "yards_per_rush": yards_per_rush,
                "rush_touchdowns": player.get("stats").get("rushing").get("rushing_td"),
                "rushes_per_touchdown": rush_per_touchdown,
                "fumbles": player.get("fumbles_lost"),
                "pass_attempts": player.get("stats").get(
                    "passing").get("passing_att"),
                "pass_completions": player.get("stats").get("passing").get("passing_cmp"),
                "completion_percentage": completion_percentage,
                "pass_yards": player.get("stats").get(
                    "passing").get("passing_yds"),
                "yards_per_pass_attempt": yards_per_pass,
                "yards_per_completion": yards_per_comp,
                "pass_touchdowns": player.get("stats").get("passing").get("passing_td"),
                "passes_per_touchdown": pass_per_touchdown,
                "interceptions": player.get("stats").get("passing").get("int"),
                "targets": player.get("stats").get("receiving").get("targets"),
                "receptions": player.get("stats").get("receiving").get("receptions"),
                "catch_percentage": catch_percentage,
                "receiving_yards": player.get("stats").get("receiving").get("receiving_yds"),
                "yards_per_reception": yards_per_reception,
                "yards_per_target": yards_per_target,
                "receiving_touchdowns": player.get("stats").get("receiving").get("receiving_td"),
                "receptions_per_touchdown": receptions_per_td,
                "targets_per_touchdown": targets_per_td,
                "total_attempts": total_att,
                "total_yards": total_yards,
                "yards_per_attempt": yards_per_att,
                "total_touchdowns": total_td,
                "attempts_per_touchdown": att_per_td,
                "games": player.get("games_played"),
                "attempts_per_game": att_per_game,
                "points": points,
                "points_per_game": points_per_game,
                "points_per_attempt": points_per_att,
            })

        starting_players = players[0:200]
        qb_points = [player.get(
            "points") for player in starting_players if player.get("position") == "QB"]
        rb_points = [player.get(
            "points") for player in starting_players if player.get("position") == "RB"]
        wr_points = [player.get(
            "points") for player in starting_players if player.get("position") == "WR"]
        te_points = [player.get(
            "points") for player in starting_players if player.get("position") == "TE"]

        if len(qb_points) > 20:
            avg_vor = sum(qb_points)/len(qb_points)
            starting_vor = qb_points[20]
            for player in starting_players:
                if player.get("position") == "QB":
                    player["average_value_over_replacement"] = round(
                        (player["points"] - avg_vor), 2)
                    player["starting_value_over_replacement"] = round(
                        (player["points"] - starting_vor), 2)

        if len(rb_points) > 30:
            avg_vor = sum(rb_points)/len(rb_points)
            starting_vor = rb_points[30]
            for player in starting_players:
                if player.get("position") == "RB":
                    player["average_value_over_replacement"] = round(
                        (player["points"] - avg_vor), 2)
                    player["starting_value_over_replacement"] = round(
                        (player["points"] - starting_vor), 2)

        if len(wr_points) > 40:
            avg_vor = sum(wr_points)/len(wr_points)
            starting_vor = wr_points[40]
            for player in starting_players:
                if player.get("position") == "WR":
                    player["average_value_over_replacement"] = round(
                        (player["points"] - avg_vor), 2)
                    player["starting_value_over_replacement"] = round(
                        (player["points"] - starting_vor), 2)

        if len(te_points) > 20:
            avg_vor = sum(te_points)/len(te_points)
            starting_vor = te_points[20]
            for player in starting_players:
                if player.get("position") == "TE":
                    player["average_value_over_replacement"] = round(
                        (player["points"] - avg_vor), 2)
                    player["starting_value_over_replacement"] = round(
                        (player["points"] - starting_vor), 2)

""" Clear all data and creates quarterbacks """
MODE_REFRESH = 'refresh'

""" Clear all data and do not create any object """
MODE_CLEAR = 'clear'


class Command(BaseCommand):
    help = "seed database for testing and development."

    def add_arguments(self, parser):
        parser.add_argument('--mode', type=str, help="Mode")

    def handle(self, *args, **options):
        self.stdout.write('seeding data...')
        run_seed(self, options['mode'])
        self.stdout.write('done.')


def clear_data():
    """Deletes all the table data"""
    Player.objects.all().delete()


def create_player(player):
    """Creates an quarterback object combining different elements from the list"""

    player = Player(
        year=player["year"],
        name=player["name"],
        team=player["team"],
        position=player["position"],
        rush_attempts=player["rush_attempts"],
        rush_yards=player["rush_yards"],
        yards_per_rush=player["yards_per_rush"],
        rush_touchdowns=player["rush_touchdowns"],
        rushes_per_touchdown=player["rushes_per_touchdown"],
        fumbles=player["fumbles"],
        pass_attempts=player["pass_attempts"],
        pass_completions=player["pass_completions"],
        completion_percentage=player["completion_percentage"],
        pass_yards=player["pass_yards"],
        yards_per_pass_attempt=player["yards_per_pass_attempt"],
        yards_per_completion=player["yards_per_completion"],
        pass_touchdowns=player["pass_touchdowns"],
        passes_per_touchdown=player["passes_per_touchdown"],
        interceptions=player["interceptions"],
        targets=player["targets"],
        receptions=player["receptions"],
        catch_percentage=player["catch_percentage"],
        receiving_yards=player["receiving_yards"],
        yards_per_reception=player["yards_per_reception"],
        yards_per_target=player["yards_per_target"],
        receiving_touchdowns=player["receiving_touchdowns"],
        receptions_per_touchdown=player["receptions_per_touchdown"],
        targets_per_touchdown=player["targets_per_touchdown"],
        total_attempts=player["total_attempts"],
        total_yards=player["total_yards"],
        yards_per_attempt=player["yards_per_attempt"],
        total_touchdowns=player["total_touchdowns"],
        attempts_per_touchdown=player["attempts_per_touchdown"],
        games=player["games"],
        attempts_per_game=player["attempts_per_game"],
        points=player["points"],
        points_per_game=player["points_per_game"],
        points_per_attempt=player["points_per_attempt"],
        average_value_over_replacement=player["average_value_over_replacement"],
        starting_value_over_replacement=player["starting_value_over_replacement"]
    )
    player.save()
    return player


def run_seed(self, mode):
    """ Seed database based on mode

    :param mode: refresh / clear
    :return:
    """
    # Clear data from tables
    clear_data()
    if mode == MODE_CLEAR:
        return

    for player in starting_players:
        create_player(player)
