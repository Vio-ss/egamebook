library stranded.fight.slash_defense_situation;

import 'package:built_value/built_value.dart';
import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/situation.dart';
import 'package:edgehead/fractal_stories/world.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/defensive_parry_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/dodge_slash.dart';
import 'package:edgehead/src/fight/slash/slash_defense/actions/parry_slash.dart';
import 'package:edgehead/src/predetermined_result.dart';

part 'slash_defense_situation.g.dart';

abstract class SlashDefenseSituation extends Situation
    implements Built<SlashDefenseSituation, SlashDefenseSituationBuilder> {
  factory SlashDefenseSituation([updates(SlashDefenseSituationBuilder b)]) =
      _$SlashDefenseSituation;

  factory SlashDefenseSituation.initialized(Actor attacker, Actor target,
          {Predetermination predeterminedResult: Predetermination.none}) =>
      new SlashDefenseSituation((b) => b
        ..id = getRandomId()
        ..time = 0
        ..attacker = attacker.id
        ..target = target.id
        ..predeterminedResult = predeterminedResult);

  SlashDefenseSituation._();

  @override
  List<EnemyTargetActionBuilder> get actionGenerators =>
      [DodgeSlash.builder, ParrySlash.builder, DefensiveParrySlash.builder];

  bool get actionsGuaranteedToFail =>
      predeterminedResult == Predetermination.failureGuaranteed;

  bool get actionsGuaranteedToSucceed =>
      predeterminedResult == Predetermination.successGuaranteed;

  int get attacker;

  @override
  int get id;

  @override
  String get name => "SlashDefenseSituation";

  Predetermination get predeterminedResult;

  int get target;

  @override
  int get time;

  @override
  SlashDefenseSituation elapseTime() => rebuild((b) => b..time += 1);

  @override
  Actor getActorAtTime(int time, WorldState w) {
    if (time == 0) return w.getActorById(target);
    return null;
  }

  @override
  Iterable<Actor> getActors(Iterable<Actor> actors, _) =>
      actors.where((actor) => actor.id == attacker || actor.id == target);
}
