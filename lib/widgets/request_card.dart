import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/travel_request.dart';
import '../theme/app_theme.dart';

class RequestCard extends StatelessWidget {
  final TravelRequest request;
  final VoidCallback onTap;

  const RequestCard({
    Key? key,
    required this.request,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              // Avatar
              CircleAvatar(
                backgroundColor: AppTheme.primaryColor,
                radius: 20,
                child: Text(
                  request.employee.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .toUpperCase(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              // Content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            request.employee.name,
                            style: const TextStyle(
                              fontWeight: FontWeight.w600,
                              fontSize: 16,
                            ),
                          ),
                        ),
                        _buildStatusChip(request.status),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${request.destination} ${request.createdAt}',
                      style: const TextStyle(
                        color: AppTheme.textSecondary,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Budget: ₹${NumberFormat('#,##,###').format(request.budget)}',
                      style: const TextStyle(
                        color: AppTheme.textSecondary,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusChip(TravelRequestStatus status) {
    Color backgroundColor;
    Color textColor;
    String text;

    switch (status) {
      case TravelRequestStatus.pending:
        backgroundColor = Colors.pink.shade100;
        textColor = Colors.pink.shade700;
        text = 'Pending';
        break;
      case TravelRequestStatus.booked:
        backgroundColor = Colors.green.shade100;
        textColor = Colors.green.shade700;
        text = 'Booked';
        break;
      case TravelRequestStatus.completed:
        backgroundColor = Colors.blue.shade100;
        textColor = Colors.blue.shade700;
        text = 'Completed';
        break;
      default:
        backgroundColor = Colors.grey.shade100;
        textColor = Colors.grey.shade700;
        text = 'Unknown';
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        text,
        style: TextStyle(
          color: textColor,
          fontSize: 12,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}