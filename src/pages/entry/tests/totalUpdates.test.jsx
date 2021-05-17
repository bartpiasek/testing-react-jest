import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../context/OrderDetails";

test("Update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // Make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // Update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.getByRole("spinbutton", {
    name: "Vanilla",
  });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // Update chocolate scoops to 2 and check tje subtotal
  const chocolateInput = await screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("Update toppings subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  // Make sure initial starts out at $0.00
  const toppingsTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // Add cherries and check subtotal
  const cherriesCheckbox = await screen.getByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");

  // Add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("3.00");

  // Remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent("1.50");
});
