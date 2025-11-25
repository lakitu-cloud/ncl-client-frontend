// {
//   "status": "success",
//   "data": {
//       "subscriber": {
//           "total": 0,
//           "active": 0,
//           "postpaid": 0,
//           "inactive": 0
//       },
//       "meter": {
//           "total": 0,
//           "active": 0,
//           "card": 0,
//           "inactive": 0
//       },
//       "wakala": {
//           "total": 2,
//           "total_float": 41000
//       },
//       "transaction": {
//           "total_count": 332,
//           "total_units": 674.5,
//           "total_revenue": 1300260,
//           "total_liters": 679000
//       },
//       "units": {
//           "today": 3,
//           "yesterday": 10,
//           "thisWeek": 3,
//           "lastWeek": 99.5,
//           "thisMonth": 110,
//           "lastMonth": 406,
//           "thisYear": 617.8,
//           "lastYear": 56.8
//       },
//       "liters": {
//           "today": 3000,
//           "yesterday": 10000,
//           "thisWeek": 3000,
//           "lastWeek": 99500,
//           "thisMonth": 110000,
//           "lastMonth": 410500,
//           "thisYear": 622250,
//           "lastYear": 56750
//       }
//   }
// }

export interface Data {
  subscriber: {
    total: number;
    inactive: number;
    active: number;
    postpaid: number;
  };
  meter: {
    total: number;
    inactive: number;
    active: number;
    card: number;
  };
  transaction: {
    total_count: number;
    total_units: number;
    total_revenue: number;
    total_liters: number;
  };
  wakala: {
    total: number;
    total_float: number;
  };
  revenue: {
    today: number;
    yesterday: number;
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
  };
  liters: {
    today: number;
    yesterday: number;
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
  };
}
