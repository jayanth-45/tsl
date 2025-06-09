import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ProgressSteps extends StatelessWidget {
  final int currentStep;

  const ProgressSteps({
    Key? key,
    required this.currentStep,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final steps = [
      'Submitted',
      'Approval',
      'Booking',
      'Completed',
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Column(
        children: [
          // Progress line and circles
          SizedBox(
            height: 60,
            child: Stack(
              children: [
                // Background line
                Positioned(
                  top: 20,
                  left: 20,
                  right: 20,
                  child: Container(
                    height: 2,
                    color: Colors.grey.shade300,
                  ),
                ),
                // Progress line
                Positioned(
                  top: 20,
                  left: 20,
                  child: Container(
                    height: 2,
                    width: (MediaQuery.of(context).size.width - 80) *
                        ((currentStep - 1) / (steps.length - 1)),
                    color: AppTheme.primaryColor,
                  ),
                ),
                // Step circles
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: List.generate(steps.length, (index) {
                    final stepNumber = index + 1;
                    final isCompleted = stepNumber <= currentStep;
                    
                    return Container(
                      width: 40,
                      height: 40,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: isCompleted ? AppTheme.primaryColor : Colors.white,
                        border: Border.all(
                          color: isCompleted ? AppTheme.primaryColor : Colors.grey.shade300,
                          width: 2,
                        ),
                      ),
                      child: Center(
                        child: isCompleted
                            ? const Icon(
                                Icons.check,
                                color: Colors.white,
                                size: 20,
                              )
                            : Text(
                                '$stepNumber',
                                style: TextStyle(
                                  color: Colors.grey.shade400,
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                      ),
                    );
                  }),
                ),
              ],
            ),
          ),
          // Step labels
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: List.generate(steps.length, (index) {
              final stepNumber = index + 1;
              final isCompleted = stepNumber <= currentStep;
              
              return SizedBox(
                width: 80,
                child: Text(
                  steps[index],
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 12,
                    color: isCompleted ? AppTheme.textPrimary : Colors.grey.shade400,
                    fontWeight: isCompleted ? FontWeight.w500 : FontWeight.normal,
                  ),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}