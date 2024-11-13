# odin-calculator
Odin JavaScript Project - Calculator

## Requirements
- Support add, subtract, multiply and divide operations for integer and float input.
- Display result in integer when there is no decimal point; otherwise, round the result to the maximum digits that fit in the display box.
- Display the latest add/subtract result when user clicks on operation even before a `=` button is clicked.
- Handle order of operations elegantly before a `=` button is clicked, that multiply and divide have higher precedence than add and subtract.
- Other scenarios to consider and each should perform the following desired behaviors.
  
  - Click `=` followed by `+`/`-`/`*`/`/`: use the LHS number for both sides of the operation.
  - Click `=` followed by `=`: repeat the last operation and display the new result.
  - Click `+`/`-`/`*`/`/` followed by `=`: perform the operation on top of the displayed result.
  - Click any of the numeric buttons followed by `=`: discard the current result and start a new operation.