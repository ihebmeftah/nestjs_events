import 'package:json_annotation/json_annotation.dart';

import '../users/user.dart';
part 'login.g.dart';

@JsonSerializable()
class Login {
  @JsonKey()
  String accessToken;
  @JsonKey(name: 'user')
  User user;

  Login({required this.accessToken, required this.user});

  factory Login.fromJson(Map<String, dynamic> json) => _$LoginFromJson(json);
}
