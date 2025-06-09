import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:go_router/go_router.dart';
import '../widgets/app_header.dart';
import '../widgets/sidebar.dart';
import '../widgets/request_card.dart';
import '../providers/app_state.dart';
import '../models/travel_request.dart';
import '../theme/app_theme.dart';

class TravelRequestsScreen extends StatefulWidget {
  const TravelRequestsScreen({Key? key}) : super(key: key);

  @override
  State<TravelRequestsScreen> createState() => _TravelRequestsScreenState();
}

class _TravelRequestsScreenState extends State<TravelRequestsScreen>
    with SingleTickerProviderStateMixin {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  late TabController _tabController;
  
  final List<Tab> _tabs = const [
    Tab(text: 'All Requests'),
    Tab(text: 'Pending'),
    Tab(text: 'Booked'),
    Tab(text: 'Completed'),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: _tabs.length, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppHeader(
        username: "Admin",
        onNotificationTap: () => context.go('/pending-requests'),
        notificationCount: 3,
      ),
      drawer: Sidebar(
        isOpen: true,
        onClose: () => Navigator.of(context).pop(),
      ),
      body: Column(
        children: [
          // Header
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.menu),
                  onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                ),
                const SizedBox(width: 8),
                const Text(
                  'Travel Requests',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
                ),
              ],
            ),
          ),

          // Tab Bar
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16),
            child: TabBar(
              controller: _tabController,
              labelColor: Colors.red.shade600,
              unselectedLabelColor: AppTheme.textSecondary,
              indicatorColor: Colors.red.shade600,
              tabs: _tabs,
            ),
          ),

          // Tab Bar View
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildRequestsList(null),
                _buildRequestsList(TravelRequestStatus.pending),
                _buildRequestsList(TravelRequestStatus.booked),
                _buildRequestsList(TravelRequestStatus.completed),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRequestsList(TravelRequestStatus? status) {
    return Consumer<AppState>(
      builder: (context, appState, child) {
        final requests = appState.getRequestsByStatus(status);
        
        if (requests.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  Icons.inbox_outlined,
                  size: 64,
                  color: Colors.grey.shade400,
                ),
                const SizedBox(height: 16),
                Text(
                  'No ${status?.toString().split('.').last ?? ''} requests found',
                  style: TextStyle(
                    color: Colors.grey.shade600,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          );
        }

        return ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: requests.length,
          itemBuilder: (context, index) {
            final request = requests[index];
            return Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: RequestCard(
                request: request,
                onTap: () => context.go('/request/${request.id}'),
              ),
            );
          },
        );
      },
    );
  }
}