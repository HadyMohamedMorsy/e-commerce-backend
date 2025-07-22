export interface DashboardOverviewResponse {
  stats: DashboardStatsResponse;
  appointmentChart: AppointmentChartResponse;
  monthlyStats: MonthlyStatsResponse[];
  doctorPerformance: DoctorPerformanceResponse[];
  recentAppointments: RecentAppointmentResponse[];
  topPatients: TopPatientResponse[];
}

export interface DashboardStatsResponse {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  totalPrescriptions: number;
  todayAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
  revenue: number;
  averageAppointmentsPerDay: number;
}

export interface AppointmentChartResponse {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface MonthlyStatsResponse {
  month: string;
  appointments: number;
  patients: number;
  prescriptions: number;
  revenue: number;
}

export interface DoctorPerformanceResponse {
  doctorId: number;
  doctorName: string;
  totalAppointments: number;
  completedAppointments: number;
  completionRate: number;
  averageRating: number;
}

export interface RecentAppointmentResponse {
  id: number;
  dateTime: Date;
  status: string;
  reason?: string;
  patient: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    specialization: string;
  };
}

export interface TopPatientResponse {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  appointmentCount: number;
}

export interface PatientGrowthResponse {
  month: string;
  newPatients: number;
}

export interface RevenueAnalyticsResponse {
  month: string;
  revenue: number;
  appointments: number;
}
