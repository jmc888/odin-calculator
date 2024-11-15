# odin-calculator
Odin JavaScript Project - Calculator

## Requirements

This calculator should behave the same as the simple calculator on your iOS device.

### Basic Requirements

- Support add, subtract, multiply and divide operations for integer and float (Not yet!) input.
- Display result in integer when there is no decimal point; otherwise, round the result to the maximum digits that fit in the display box.
- Display the latest result from the current level of operations even before a `=` button is clicked.
- Handle order of operations elegantly before a `=` button is clicked, that multiply and divide have higher precedence than add and subtract.
- Handle divide by 0 error elegantly even when the error happen within the operation chain.
- A clear `C` button to clear out the current input or `AC` to reset the calculator.
- A `+/-` utility button to quickly convert the current display result or input from positive values to negative values. (Not yet!)
- A `%` utility button to quickly convert the current display result or input from percentage to decimals. (Not yet!)

### User Input Edge Cases

- Click `+`/`-`/`*`/`/` followed by `+`/`-`/`*`/`/` without any number input: discard the previous operation and only perform the latest one with the next number input.
- Click `=` followed by `+`/`-`/`*`/`/` without any number input: use the LHS number for both sides of the operation.
- Click `=` followed by number input: return the number input.
- Click `=` followed by `=`: repeat the last operation and display the new result.
- Click `+`/`-`/`*`/`/` followed by `=`: perform the operation on top of the displayed result.
- Click any of the numeric buttons followed by `=`: discard the current result and start a new operation.
- Click `C` after `=` and then click on `=` again: clear out the current results and reset it to 0; repeat the last operation.
- Click multiple `.` when input the number: only recognize the first `.` input and discard the following. (Not Yet!)
- Input `0` `.` `1` should be equivalent to `.` `1`.  (Not Yet!)