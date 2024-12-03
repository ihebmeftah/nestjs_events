// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Login _$LoginFromJson(Map<String, dynamic> json) => Login(
      accessToken: json['accessToken'] as String,
      createdUser: User.fromJson(json['createdUser'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$LoginToJson(Login instance) => <String, dynamic>{
      'accessToken': instance.accessToken,
      'createdUser': instance.createdUser,
    };
