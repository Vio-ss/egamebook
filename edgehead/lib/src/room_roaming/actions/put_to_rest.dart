import 'package:edgehead/fractal_stories/action.dart';
import 'package:edgehead/fractal_stories/actor.dart';
import 'package:edgehead/fractal_stories/context.dart';
import 'package:edgehead/fractal_stories/history/custom_event_history.dart';
import 'package:edgehead/fractal_stories/simulation.dart';
import 'package:edgehead/fractal_stories/world_state.dart';
import 'package:edgehead/src/fight/common/humanoid_pain_or_death.dart';
import 'package:edgehead/src/fight/common/necromancy.dart';

/// Turns a corpse undead. To be used when we are roaming or in an idle room.
/// Use [TurnUndead] in combat.
class PutToRest extends OtherActorActionBase {
  static final PutToRest singleton = PutToRest();

  static const String className = "PutToRest";

  @override
  List<String> get commandPathTemplate =>
      ["<objectNounWithAdjective>", "put to rest"];

  @override
  String get helpMessage => "I can put the undead to rest, "
      "undoing the unlife I created. "
      "I can only do this while in relative peace, not in combat.";

  @override
  bool get isAggressive => false;

  @override
  bool get isProactive => true;

  @override
  String get name => className;

  @override
  bool get rerollable => false;

  @override
  // TODO: sanity
  Resource get rerollResource => null;

  @override
  String get rollReasonTemplate => null;

  @override
  String applyFailure(ActionContext context, Actor corpse) {
    throw UnimplementedError();
  }

  @override
  String applySuccess(ActionContext context, Actor undead) {
    final a = context.actor;
    final s = context.outputStoryline;
    final w = context.outputWorld;

    // TODO - create a "cosmetic" version for putting an insect to rest

    w.recordCustom(CustomEvent.actorPuttingUndeadToRest, actor: undead);

    a.report(s, "<subject> put<s> a hand on <object>", object: undead);
    undead.report(s, "<subject> collapse<s> to the ground");

    // TODO: move currentWeapon and currentShield to `a`
    w.updateActorById(
        undead.id,
        (b) => b
          ..hitpoints = 0
          ..npc.followingActorId = null);

    return "${a.name} put ${undead.name} to rest";
  }

  @override
  Iterable<Actor> generateObjects(ApplicabilityContext context) {
    final necromancer = context.actor;

    final party = getPartyOf(necromancer, context.simulation, context.world);
    return party.where((actor) => actor.anatomy.isUndead);
  }

  @override
  ReasonedSuccessChance getSuccessChance(
          Actor a, Simulation sim, WorldState w, Actor object) =>
      ReasonedSuccessChance.sureSuccess;

  @override
  bool isApplicable(ApplicabilityContext c, Actor a, Simulation sim,
          WorldState w, Actor object) =>
      a.isPlayer && isFollowedByAnUndead(c, a);
}
