import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:file_picker/file_picker.dart';
import '../widgets/app_header.dart';
import '../widgets/progress_steps.dart';
import '../theme/app_theme.dart';

class BookingDetailsScreen extends StatefulWidget {
  final String requestId;

  const BookingDetailsScreen({
    Key? key,
    required this.requestId,
  }) : super(key: key);

  @override
  State<BookingDetailsScreen> createState() => _BookingDetailsScreenState();
}

class _BookingDetailsScreenState extends State<BookingDetailsScreen> {
  final _flightTicketController = TextEditingController();
  final _hotelNameController = TextEditingController();
  String? _flightInvoicePath;
  String? _hotelInvoicePath;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppHeader(username: "Admin"),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () => context.pop(),
                ),
                const SizedBox(width: 8),
                const Text(
                  'Request Details',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Progress Steps
            const ProgressSteps(currentStep: 3),
            const SizedBox(height: 32),

            // Flight Details
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Flight Details',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    TextField(
                      controller: _flightTicketController,
                      decoration: const InputDecoration(
                        labelText: 'Ticket Price',
                        prefixIcon: Icon(Icons.flight),
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildFileUpload(
                      'Flight Invoice Upload',
                      _flightInvoicePath,
                      () => _pickFile((path) => setState(() => _flightInvoicePath = path)),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Hotel Details
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Hotel Details',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildFileUpload(
                      'Hotel Invoice Upload',
                      _hotelInvoicePath,
                      () => _pickFile((path) => setState(() => _hotelInvoicePath = path)),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 32),

            // Save Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => context.go('/request/${widget.requestId}/completed'),
                child: const Text('Save and Complete Booking'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFileUpload(String label, String? filePath, VoidCallback onTap) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: AppTheme.textSecondary,
          ),
        ),
        const SizedBox(height: 8),
        GestureDetector(
          onTap: onTap,
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              border: Border.all(
                color: Colors.grey.shade300,
                style: BorderStyle.solid,
                width: 2,
              ),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              children: [
                Icon(
                  Icons.upload_file,
                  size: 32,
                  color: Colors.grey.shade400,
                ),
                const SizedBox(height: 12),
                Text(
                  filePath != null
                      ? filePath.split('/').last
                      : 'Click or drag file to this area to upload',
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 14,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryColor,
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: const Text(
                    'Browse Files',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Future<void> _pickFile(Function(String) onFilePicked) async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf', 'jpg', 'jpeg', 'png'],
    );

    if (result != null) {
      onFilePicked(result.files.single.path!);
    }
  }
}