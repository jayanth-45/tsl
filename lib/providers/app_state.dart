import 'package:flutter/material.dart';
import '../models/travel_request.dart';
import '../models/employee.dart';
import '../data/mock_data.dart';

class AppState extends ChangeNotifier {
  List<TravelRequest> _travelRequests = MockData.travelRequests;
  List<Employee> _employees = MockData.employees;
  String _selectedDepartment = '';
  String _searchTerm = '';

  List<TravelRequest> get travelRequests => _travelRequests;
  List<Employee> get employees => _employees;
  String get selectedDepartment => _selectedDepartment;
  String get searchTerm => _searchTerm;

  List<TravelRequest> get pendingRequests =>
      _travelRequests.where((r) => r.status == TravelRequestStatus.pending).toList();

  List<TravelRequest> get bookedRequests =>
      _travelRequests.where((r) => r.status == TravelRequestStatus.booked).toList();

  List<TravelRequest> get completedRequests =>
      _travelRequests.where((r) => r.status == TravelRequestStatus.completed).toList();

  List<Employee> get filteredEmployees {
    List<Employee> filtered = _employees;

    if (_selectedDepartment.isNotEmpty) {
      filtered = filtered.where((e) => e.department == _selectedDepartment).toList();
    }

    if (_searchTerm.isNotEmpty) {
      filtered = filtered.where((e) =>
          e.name.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          e.position!.toLowerCase().contains(_searchTerm.toLowerCase()) ||
          e.email.toLowerCase().contains(_searchTerm.toLowerCase())).toList();
    }

    return filtered;
  }

  void setSelectedDepartment(String department) {
    _selectedDepartment = _selectedDepartment == department ? '' : department;
    notifyListeners();
  }

  void setSearchTerm(String term) {
    _searchTerm = term;
    notifyListeners();
  }

  TravelRequest? getTravelRequestById(String id) {
    try {
      return _travelRequests.firstWhere((r) => r.id == id);
    } catch (e) {
      return null;
    }
  }

  void updateTravelRequest(TravelRequest updatedRequest) {
    final index = _travelRequests.indexWhere((r) => r.id == updatedRequest.id);
    if (index != -1) {
      _travelRequests[index] = updatedRequest;
      notifyListeners();
    }
  }

  List<TravelRequest> getRequestsByStatus(TravelRequestStatus? status) {
    if (status == null) return _travelRequests;
    return _travelRequests.where((r) => r.status == status).toList();
  }
}