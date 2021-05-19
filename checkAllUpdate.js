$(() => {
  const tasks = [];
  const modalIDStrings = [];
  const fullResultModalStrings = [];
  let taskNumber = 0;

  function checkAndCreate() {
    const checkAllButton = '<div><button class="check-all-btn" style="margin: 2rem 0 0; border-radius: 0.5rem; position: fixed; bottom: 40px; right: 100px; height: 50px; background-color: #48d1cc;">Check All Tasks</button></div>';
    const checkAllTasksResults = '<div class="check-all-tasks" style="padding: 2rem; margin-bottom: 2rem; border-radius: 0.5rem; position: fixed; bottom: 100px; right: 40px; height: 50vh; text-align: center;"><div><p class="grid-header">Check All Tasks Results</p></div></div>';
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
      width: '25%',
      display: 'grid',
      'grid-template-columns': '5rem 5rem 5rem 5rem',
      'grid-template-rows': 'auto',
      'grid-template-areas': '"header header header header""main main main main"',
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
        $(selectorString).click();
        const fullModalIDString = `#task-test-correction-${taskID}-correction-modal`;
        const taskCheckString = `<div><p class="grid-main" style="display: flex; justify-content: center; align-items: center;">${taskNumber.toString()}</p></div>`;
        const fullResultModalSelectorString = `#task-test-correction-${taskID}-correction-modal > div > div > div.modal-body > div.result`;
        $('button.close').click();
        $('.check-all-tasks').append(taskCheckString);
        tasks.push(taskID);
        modalIDStrings.push(fullModalIDString);
        fullResultModalStrings.push(fullResultModalSelectorString);
        taskNumber += 1;
      });
    });
  }

  function checkAllTasks() {
    $('.check-all-btn').on('click', () => {
      $("button[id$='check-code-btn']").each(function triggerClicks() {
        $(this).trigger('click');
        $('button.close').trigger('click');
      });
      // Change setTimeout to be dynamic when all checks are finished
      setTimeout(() => {
        let index = 0;
        tasks.forEach(() => {
          fullResultModalStrings.forEach((fRMString) => {
            const pContainsStringFull = `.check-all-tasks > div > p:contains(${index})`;
            const modalChildren = $(`${fRMString} > .correction-request-timeline`).children().toArray();
            const failedChecks = modalChildren.filter((child) => child.className.includes('failed'));
            if (failedChecks.length > 0) $(pContainsStringFull).css('background-color', 'red');
            else $(pContainsStringFull).css('background-color', 'green');
          });
          index += 1;
        });
      }, 30000);
    });
  }

  checkAndCreate();
  addClickListeners();
  checkAllTasks();
});
