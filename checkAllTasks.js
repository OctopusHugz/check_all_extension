$(() => {
	const tasks = [];
	let taskNumber = 0;

	function checkAndCreate() {
		const checkAllButton = '<div><button class="check-all-btn" style="margin: 2rem 0 0; border-radius: 0.5rem; position: fixed; bottom: 40px; right: 100px; height: 50px; background-color: #48d1cc;">Check All Tasks</button></div>';
		const checkAllTasksResults = '<div class="check-all-tasks" style="padding: 2rem; margin-bottom: 2rem; border-radius: 0.5rem; position: fixed; bottom: 100px; right: 40px; height: 50vh; text-align: center;"></div>';
		const checkerAvailable = $(".list-group-item:contains('was')").html();
		const secondChance = $(".list-group-item:contains('second')").html();
		const projectFinished = $(".list-group-item:contains('over')").html();

		if (checkerAvailable || secondChance || projectFinished) {
			$(checkAllButton).insertAfter('main');
			$(checkAllTasksResults).insertAfter('main');
		}

		$('.check-all-tasks').css({
			'background-color': 'rgb(30, 33, 34)',
			color: 'white',
			width: '10%',
			display: 'grid',
			'grid-template-columns': '5rem',
			'grid-template-rows': 'auto',
			'grid-template-areas': '"main"',
			gap: '2rem',
			'justify-content': 'center',
			'overflow-y': 'auto',
		});

		$('.grid-header').css('grid-area', 'header');
		$('.grid-main').css('grid-area', 'main');
	}

	function addClickListeners() {
		$("button[id$='check-code-btn']").each(function getAllCheckCodeButtons() {
			$(this).one('click', function addListenerToButton() {
				const taskID = $(this).data('task-id').toString();
				const selectorString = `.correction_request_test_send[data-task-id='${taskID}']`;
				if ($(selectorString)) {
					tasks.push(taskID);
					$(selectorString).click();
				}
				const taskCheckString = `<div><p class="grid-main" style="display: flex; justify-content: center; align-items: center;">${taskNumber.toString()}</p></div>`;
				$('button.close').click();
				$('.check-all-tasks').append(taskCheckString);
				taskNumber += 1;
			});
		});
	}

	function waitForAllEls(selector, callback) {
		if (document.querySelectorAll(selector).length > 0) callback();
		else {
			setTimeout(function () {
				waitForAllEls(selector, callback);
			}, 1000);
		}
	};

	function checkAllTasks() {
		let index = 0;
		const failedChecks = [];
		$('.check-all-btn').on('click', () => {
			$("button[id$='check-code-btn']").each(function () {
				$(this).trigger('click');
				$('button.close').trigger('click');
				const taskID = $(this).data('task-id').toString();
				const pContainsStringFull = `div.check-all-tasks > div > p:contains(${index})`;
				const fRMString = `#task-test-correction-${taskID}-correction-modal > div > div > div.modal-body > div.result > ul.correction-request-timeline > li`;
				waitForAllEls(fRMString, () => {
					const modalChildren = document.querySelectorAll(fRMString);
					modalChildren.forEach((child) => {
						if (child.className.includes('failed')) failedChecks.push(child);
					});
					if (failedChecks.length > 0) $(pContainsStringFull).css('background-color', 'red');
					else $(pContainsStringFull).css('background-color', 'green');
				})
				index += 1;
			});
		});
	}

	checkAndCreate();
	addClickListeners();
	checkAllTasks();
});
