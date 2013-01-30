library egb_player_profile;

import 'dart:collection';
import 'dart:async';
import 'dart:json';

import 'egb_savegame.dart';
import 'egb_storage.dart';

/**
 * Encapsulates info about a unique player of current egamebook.
 * A player can have preferences and up to [maxSaves] savegames for the current
 * egamebook.
 *
 * Note: this class does not reveal savegames for other egamebooks. It
 * theoretically could, but there is no reason, so it only works with
 * the [currentEgamebookUid].
 *
 * Allows the Runner to save and load games from/to a storage. This can be
 * memory, a file, a database, or – more specifically – HTML5 localStorage.
 */
class EgbPlayerProfile {

  const String PREFERENCES_KEY = "prefs";

  EgbPlayerProfile(this.playerUid, this._storage) {
    _loadPreferences();
  }

  void close() {
    if (savegamesChronology != null) _saveChronology();
    _savePreferences();
  }

  /// Uid of the player this profile is associated with.
  String playerUid;
  /// Uid of current gamebook. *Must* be set for saving and loading to work.
  String currentEgamebookUid;

  /**
   * Global (non-gamebook-specific) preferences of the player.
   */
  Map<String,dynamic> preferences;

  Future<bool> _savePreferences() {
    return _storage.save("$playerUid::$PREFERENCES_KEY",
                         stringify(preferences));
  }

  Future<bool> _loadPreferences() {
    var completer = new Completer();
    _storage.load("$playerUid::$PREFERENCES_KEY")
    .then((json) {
      if (json == null || json == "") {
        preferences = new Map();
      } else {
        preferences = parse(json);
      }
      completer.complete(true);
    });
    return completer.future;
  }

  /// A queue of [savegame] [:uid:] fields. Make it easier to find the oldest
  /// or newest savegame, as well as sorting them. (Without resorting to sort
  /// by timestamp each time.)
  Queue<String> savegamesChronology;

  /// Instance of Storage to use.
  EgbStorage _storage;

  /**
   * Number of savegames to keep in storage per given egamebook and player.
   */
  int _maxSaves = 10;
  get maxSaves => _maxSaves;
  set maxSaves(int value) => _maxSaves = value; // TODO fix queue etc.

  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the key, then saves to the storage.
  /// Throws if [currentEgamebookUid] is not set.
  Future<bool> _save(String key, String value) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _storage.save("$playerUid::$currentEgamebookUid::$key", value);
  }

  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the key, then loads from the storage.
  /// Throws if [currentEgamebookUid] is not set.
  Future<String> _load(String key) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _storage.load("$playerUid::$currentEgamebookUid::$key");
  }

  /// Helper function that prepends [playerUid] and [currentEgamebookUid] to
  /// the key, then removes the key-value paid from the storage.
  /// Throws if [currentEgamebookUid] is not set.
  Future<bool> _delete(String key) {
    if (currentEgamebookUid == null) throw "currentEgamebookUid not set"; //TODO
    return _storage.delete("$playerUid::$currentEgamebookUid::$key");
  }

  Future<bool> _saveChronology() {
    return _save("_chronology", stringify(savegamesChronology.toList()));
  }

  Future<bool> _loadChronology() {
    return _load("_chronology").then((json) {
      if (json != null) {
        List<String> list = parse(json);
        savegamesChronology = new Queue<String>.from(list);
      } else {
        savegamesChronology = new Queue<String>();
      }
      return true;
    });
  }

  Future<bool> _updateChronology() {

  }

  /**
   * Adds the savegame to the existing [savegames] Queue, then saves to
   * storage. Files it under the [currentEgamebookUid] and [playerUid].
   *
   * Gets rid of old savegames if there is more than [maxSaves] present in
   * the storage.
   */
  Future<bool> save(EgbSavegame savegame) {
    if (savegamesChronology == null) {
      // We haven't retrieved savegamesChronology from the _storage yet.
      // This code goes fetch it, re-runs the save() method, then forwards the
      // result to the caller of this function.
      var completer = new Completer();
      _loadChronology()
      .then((_) => save(savegame)
        .then((value) {completer.complete(value);}));
      return completer.future;
    }

    if (savegamesChronology.length > maxSaves) {
      var hashToRemove = savegamesChronology.removeFirst();
      _delete(hashToRemove);
    }

    savegamesChronology.addLast(savegame.uid);
    _saveChronology();
    return _save(savegame.uid, savegame.toJson());
  }

  /// Loads the savegame by [:uid:]. Returns [:null:] when there is
  /// no savegame with that [uid] in memory.
  Future<EgbSavegame> load(String uid) {
    var completer = new Completer<EgbSavegame>();

    _load(uid)
    .then((json) {
      if (json == null) {
        completer.complete(null);
      } else {
        // extract savegame from JSON
        var savegame = new EgbSavegame.fromJson(json);
        completer.complete(savegame);
      }
    });

    return completer.future;
  }

  /// Loads the latest savegame. Returns [:null:] when there are
  /// no savegames.
  Future<EgbSavegame> loadMostRecent() {
    if (savegamesChronology == null) {
      // We haven't retrieved savegamesChronology from the _storage yet.
      // This code goes fetch it, re-runs the loadMostRecent() method, then
      // forwards the result to the caller of this function.
      // TODO: dry with save() ?
      var completer = new Completer();
      _loadChronology()
      .then((_) => loadMostRecent()
        .then((value) {completer.complete(value);}));
      return completer.future;
    }

    if (savegamesChronology.isEmpty) return new Future.immediate(null);
    return load(savegamesChronology.last);
  }
}
