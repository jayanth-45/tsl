import 'employee.dart';

class TravelRequest {
  final String id;
  final Employee employee;
  final String destination;
  final String startDate;
  final String? endDate;
  final double budget;
  final TravelRequestStatus status;
  final String createdAt;
  final String? purpose;
  final String? description;
  final String? dates;
  final TravelType? type;

  TravelRequest({
    required this.id,
    required this.employee,
    required this.destination,
    required this.startDate,
    this.endDate,
    required this.budget,
    required this.status,
    required this.createdAt,
    this.purpose,
    this.description,
    this.dates,
    this.type,
  });

  factory TravelRequest.fromJson(Map<String, dynamic> json) {
    return TravelRequest(
      id: json['id'],
      employee: Employee.fromJson(json['employee']),
      destination: json['destination'],
      startDate: json['startDate'],
      endDate: json['endDate'],
      budget: json['budget'].toDouble(),
      status: TravelRequestStatus.values.firstWhere(
        (e) => e.toString().split('.').last == json['status'],
      ),
      createdAt: json['createdAt'],
      purpose: json['purpose'],
      description: json['description'],
      dates: json['dates'],
      type: json['type'] != null
          ? TravelType.values.firstWhere(
              (e) => e.toString().split('.').last == json['type'],
            )
          : null,
    );
  }

  TravelRequest copyWith({
    String? destination,
    String? startDate,
    double? budget,
    TravelRequestStatus? status,
  }) {
    return TravelRequest(
      id: id,
      employee: employee,
      destination: destination ?? this.destination,
      startDate: startDate ?? this.startDate,
      endDate: endDate,
      budget: budget ?? this.budget,
      status: status ?? this.status,
      createdAt: createdAt,
      purpose: purpose,
      description: description,
      dates: dates,
      type: type,
    );
  }
}

enum TravelRequestStatus { pending, booked, completed, approved, booking }

enum TravelType { flight, hotel, both }

class BookingDetails {
  final String? flightTicketNumber;
  final String? flightInvoicePath;
  final String? hotelName;
  final String? hotelInvoicePath;

  BookingDetails({
    this.flightTicketNumber,
    this.flightInvoicePath,
    this.hotelName,
    this.hotelInvoicePath,
  });
}