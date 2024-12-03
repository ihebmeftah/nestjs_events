import 'package:json_annotation/json_annotation.dart';
part 'login.dto.g.dart';

@JsonSerializable()
class LoginDto {
  @JsonKey()
  final String email;
  @JsonKey()
  final String password;

  LoginDto({required this.email, required this.password});

  Map<String, dynamic> toJson() => _$LoginDtoToJson(this);
}
