export interface Trip {
    _id: string;
    tripId: string;
    transporter: string;
    source: string;
    dest: string;
    currentStatus: 'Booked' | 'In Transit' | 'Reached Destination' | 'Delivered' | 'Delayed';
    currentStatusCode: string;
    tripStartTime: string;
    tripEndTime: string;
    lastPingTime: string;
    phoneNumber?: string;
    etaDays: number;
    tatStatus?: 'Ontime' | 'Delayed' | 'Others';
  }
  
  export interface Counters {
    total: number;
    delivered: number;
    inTransit: number;
    delayed: number;
  }