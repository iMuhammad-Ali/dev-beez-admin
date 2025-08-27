/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { User, Home, Phone } from "lucide-react";
const routes = [
  {
    path: "/app/dashboard", // the url
    name: "Dashboard", // name that appear in Sidebar
    icon: Home,
  },
  {
    path: "/app/book-service", // the url
    name: "Book Service", // name that appear in Sidebar
    icon: User,
  },
  {
    path: "/app/schedule-call", // the url
    name: "Schedule Call", // name that appear in Sidebar
    icon: Phone,
  },
];

export default routes;
