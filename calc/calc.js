
		var calOperators = {
			addButton: function(a, b) {
				return a+b;
			},
			subtractButton: function(a, b) {
				return a-b;
			},
			multiplyButton: function(a, b) {
				return a*b;
			},
			divideButton: function(a, b) {
				return a/b;
			}
		}


		function evaluate(stack) {
		 	return calOperators[stack[1]](stack[0], stack[2]);
		};

		var stack = [];
		var display = '';
		var current;

		// to restore to initial state
		 	$("#clearButton").click(function() { 
		 		display = '';
		 		stack = [];
		 		current = NaN;
		 		$("#display").val(display);
		 	});


		$(function() {
		    $(".digit").click(function() {
		    	if (stack.length == 1 || stack.length == 3) { 
		    		display = '';
		    		stack = [];
		    	} 

		    	display += $(this).val();
		    	$("#display").val(Number(display));
		    	current = Number(display);
		 	});


		 	$(".operator").click(function() {
		 		if (stack.length == 3) { 
		 			stack = [];
		 			stack.push(Number(display));
		 			stack.push(this.id);
		 		} else if (stack.length == 2) { 
		 			if (isNaN(current)) { 
		 				stack[1] = this.id; 
		 			} else { 
		 				stack.push(Number(display));
		 				display = evaluate(stack);
		 				$("#display").val(display);
		 				stack = [display, this.id]; 
		 			}
		 		} else if (stack.length == 1) { 
		 			stack.push(this.id);
		 		} else { 
		 			stack.push(Number(display));
		 			stack.push(this.id);
		 			display = ''; 
		 		}
		 		current = NaN;
		 		display = ''; 		
		 	});

		 	$("#equalsButton").click(function() {	
		 		if (stack.length == 0) { 
		 			if (current) { 
		 				stack = [current];
		 			}
		 		} else if (stack.length == 2) {  
		 			if (!isNaN(current)) { 
		 				stack.push(Number(display));
		 				console.log(stack);
		 				display = evaluate(stack);
		 				$("#display").val(display);				
		 			} // else ignore		
		 		} else if (stack.length == 3) { 
		 			stack[0] = display;
		 			display = evaluate(stack);
		 			$("#display").val(display);
		 		} 		
		 	});
		});