class Employee {
  final String id;
  final String name;
  final String empId;
  final String department;
  final String email;
  final String phone;
  final String? position;
  final String? joinedDate;

  Employee({
    required this.id,
    required this.name,
    required this.empId,
    required this.department,
    required this.email,
    required this.phone,
    this.position,
    this.joinedDate,
  });

  factory Employee.fromJson(Map<String, dynamic> json) {
    return Employee(
      id: json['id'],
      name: json['name'],
      empId: json['empId'],
      department: json['department'],
      email: json['email'],
      phone: json['phone'],
      position: json['position'],
      joinedDate: json['joinedDate'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'empId': empId,
      'department': department,
      'email': email,
      'phone': phone,
      'position': position,
      'joinedDate': joinedDate,
    };
  }
}

class Department {
  final String id;
  final String name;
  final int employeeCount;
  final String color;
  final String icon;

  Department({
    required this.id,
    required this.name,
    required this.employeeCount,
    required this.color,
    required this.icon,
  });
}