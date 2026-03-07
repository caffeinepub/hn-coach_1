import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Migration "migration";

(with migration = Migration.run)
actor {
  type DownloadRecord = {
    name : Text;
    whatsapp : Text;
    city : Text;
    occupation : Text;
    invitedBy : Text;
    timestamp : Int;
  };

  let downloadRecords = Map.empty<Text, DownloadRecord>();

  public query ({ caller }) func getRecords(from : ?Nat, take : ?Nat) : async [DownloadRecord] {
    let fromValue = switch (from) {
      case (null) { 0 };
      case (?value) { value };
    };
    let takeValue = switch (take) {
      case (null) { 999 };
      case (?value) { value };
    };
    downloadRecords.values().drop(fromValue).take(takeValue).toArray();
  };

  public shared ({ caller }) func recordDownload(
    name : Text,
    whatsapp : Text,
    city : Text,
    occupation : Text,
    invitedBy : Text,
    timestamp : Int,
  ) : async Int {
    let newDownload : DownloadRecord = {
      name;
      whatsapp;
      city;
      occupation;
      invitedBy;
      timestamp;
    };
    downloadRecords.add(whatsapp, newDownload);
    timestamp;
  };

  public query ({ caller }) func getCount() : async Nat {
    downloadRecords.size();
  };
};
