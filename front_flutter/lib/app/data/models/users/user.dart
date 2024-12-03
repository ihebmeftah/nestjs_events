import 'package:json_annotation/json_annotation.dart';
part 'user.g.dart';

@JsonSerializable()
class User {
  @JsonKey(includeToJson: false)
  String? id;
  @JsonKey()
  String? firstName;
  @JsonKey()
  String? lastName;
  @JsonKey()
  String? email;
  @JsonKey()
  String? phone;
  @JsonKey()
  String? deviceToken;
  @JsonKey(includeFromJson: false, includeToJson: true)
  String? password;

  User(
      {this.id,
      this.firstName,
      this.lastName,
      this.email,
      this.phone,
      this.deviceToken,
      this.password});
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
