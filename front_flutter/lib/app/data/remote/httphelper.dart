import 'dart:convert';
import 'dart:developer';
import 'package:get/utils.dart';
import 'package:http/http.dart' as http;

import '../local/sharedpref.dart';
import 'apis_exception.dart';

class Httphelper {
  Httphelper._();

  static String get _baseUrl => GetPlatform.isIOS
      ? "http://localhost:3000/api/v1"
      : 'http://10.0.2.2:3000/api/v1';
  static Map<String, String> get _header => {
        if (Sharedpref().getToken != null)
          'Authorization': Sharedpref().getToken!,
        'Content-Type': 'application/json'
      };

  static Future<Map<String, dynamic>> get({
    required String path,
  }) async {
    final response = await http.get(
      Uri.parse('$_baseUrl$path'),
      headers: _header,
    );
    return _processResponse(response);
  }

  static Future<Map<String, dynamic>> post(
      {required String path,
      Map<String, dynamic>? header,
      Object? body}) async {
    final response = await http.post(
      Uri.parse('$_baseUrl$path'),
      headers: {..._header, if (header != null) ...header},
      body: body == null ? null : json.encode(body),
    );
    return _processResponse(response);
  }

  static Future<Map<String, dynamic>> put(
      {required String path,
      Map<String, dynamic>? header,
      Object? body}) async {
    final response = await http.put(
      Uri.parse('$_baseUrl$path'),
      headers: {..._header, if (header != null) ...header},
      body: body == null ? null : json.encode(body),
    );
    return _processResponse(response);
  }

  static Future<Map<String, dynamic>> patch(
      {required String path,
      Map<String, dynamic>? header,
      Object? body}) async {
    final response = await http.patch(
      Uri.parse('$_baseUrl$path'),
      headers: {..._header, if (header != null) ...header},
      body: body == null ? null : json.encode(body),
    );
    return _processResponse(response);
  }

  static Future<Map<String, dynamic>> delete(
      {required String path,
      Map<String, dynamic>? header,
      Object? body}) async {
    final response = await http.delete(
      Uri.parse('$_baseUrl$path'),
      headers: {..._header, if (header != null) ...header},
      body: body == null ? null : json.encode(body),
    );
    return _processResponse(response);
  }

  static Map<String, dynamic> _processResponse(http.Response response) {
    final statusCode = response.statusCode;
    log("""
    ----- 🔘 HTTP LOGGER 🔘 -----
    ${response.statusCode >= 200 && response.statusCode <= 299 ? "🟢" : "🔴"} ${response.statusCode} STATUS CODE : ${response.statusCode}
    Methode : ${response.request!.method}
    URL : ${response.request!.url}
    HEADERS : ${response.request!.headers}
    DATA : ${response.body}
    """);
    if (statusCode >= 200 && statusCode < 300) {
      return json.decode(response.body);
    } else if (statusCode == 400) {
      throw BadRequestExcpetion();
    } else if (statusCode == 404) {
      throw NotFoundExcpetion();
    } else if (statusCode == 409) {
      throw ConflictExcpetion();
    } else {
      throw Exception('HTTP ${response.statusCode}: ${response.body}');
    }
  }
}
