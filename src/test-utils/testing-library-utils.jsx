import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { renderWithContext as render };
