import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../theme/app_theme.dart';

class Sidebar extends StatelessWidget {
  final bool isOpen;
  final VoidCallback onClose;

  const Sidebar({
    Key? key,
    required this.isOpen,
    required this.onClose,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final currentLocation = GoRouterState.of(context).uri.toString();

    final menuItems = [
      SidebarItem(
        icon: Icons.dashboard_outlined,
        label: 'Dashboard',
        path: '/',
        isActive: currentLocation == '/',
      ),
      SidebarItem(
        icon: Icons.access_time,
        label: 'Travel Requests',
        path: '/pending-requests',
        isActive: currentLocation == '/pending-requests',
      ),
      SidebarItem(
        icon: Icons.people_outline,
        label: 'Employee Management',
        path: '/employees',
        isActive: currentLocation == '/employees',
      ),
    ];

    return Drawer(
      child: Column(
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: AppTheme.borderColor),
              ),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: Colors.grey[200],
                  child: const Icon(Icons.person, color: Colors.grey),
                ),
                const SizedBox(width: 12),
                const Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Anthony',
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 16,
                      ),
                    ),
                    Text(
                      'Admin Dashboard',
                      style: TextStyle(
                        color: AppTheme.textSecondary,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          // Menu
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Main Menu',
                    style: TextStyle(
                      color: AppTheme.textSecondary,
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ...menuItems.map((item) => _buildMenuItem(context, item)),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem(BuildContext context, SidebarItem item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: Icon(
          item.icon,
          color: item.isActive ? Colors.white : AppTheme.textSecondary,
        ),
        title: Text(
          item.label,
          style: TextStyle(
            color: item.isActive ? Colors.white : AppTheme.textPrimary,
            fontWeight: FontWeight.w500,
          ),
        ),
        tileColor: item.isActive ? AppTheme.primaryColor : null,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        onTap: () {
          context.go(item.path);
          onClose();
        },
      ),
    );
  }
}

class SidebarItem {
  final IconData icon;
  final String label;
  final String path;
  final bool isActive;

  SidebarItem({
    required this.icon,
    required this.label,
    required this.path,
    required this.isActive,
  });
}