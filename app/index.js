const { select, input, checkbox } = require('@inquirer/prompts')

let goalsList = []

const start = async () => {

  while(true) {
    const selectedOption = await select({
      message: "Menu >",
      choices: [
        { name: "Create goals",         value: "createGoals"        },
        { name: "List goals",           value: "listGoals"          },
        { name: "List pending goals",   value: "pendingGoals"       },
        { name: "List completed goals", value: "completedGoals"     },
        { name: "Delete goals",         value: "deleteGoals"        },
        { name: "Exit Menu",            value: "exitMenu"           },
      ]
    })

    console.clear()
    
    switch (selectedOption) {
      case "createGoals":
        await createGoals()
        break
      case "listGoals":
        await listGoals()
        break
      case "pendingGoals":
        await pendingGoals()
        break
      case "completedGoals":
        completedGoals()
        break
      case "deleteGoals":
        deleteGoals()
        break
      case "exitMenu":
        console.log("Exit Menu")
        return                      // stop the while looping
      default:
        break
    }
  }
}

const createGoals = async () => {
  const goalInput = await input({
    message: "Type your goal:"
  })

  if (goalInput.length <= 0) {
    console.log("Goal can't be empty.")
    return
  }

  goalsList.push({ value: goalInput, checked: false })
  console.log("Goal successfully created.")
}

const listGoals = async () => {
  if (goalsList.length <= 0) {
    console.log("There are no goals to list.")
    return
  }

  const selectedGoalsList = await checkbox({
    message: "Press spacebar to check/uncheck.",
    choices: [...goalsList],
    instructions: false
  })

    // reset check from all goals
    goalsList.forEach(goal => {
      goal.checked = false
    })  

  if (selectedGoalsList.length <= 0) {
    console.log("There are no selected goals.")
    return
  }

  

  // check only the goals are checked
  selectedGoalsList.forEach(selectedGoal => {
    const goal = goalsList.find(goalItem => {
      return goalItem.value == selectedGoal
    })

    goal.checked = true

  })

  console.log('mostra todas as metas')
  console.log(goalsList)
}

const pendingGoals = async () => {
  let pendingGoalsList = []
  
  goalsList.forEach(goal => {
    if (!goal.checked) {
      pendingGoalsList.push(goal)
    }
  })

  if (pendingGoalsList.length <= 0) {
    console.log("There are no pending goals.")
    return
  }
  
  console.log("Pending Goals:")

  for (const goalItem of pendingGoalsList) {
    console.log(goalItem.value)
  }
}

const completedGoals = async () => {
  
  let completedGoalsList = goalsList.filter(goal => { return goal.checked }) // this will only return checked goals

  if (completedGoalsList.length <= 0) {
    console.log("There are no completed goals.")
    return
  }

  console.log("Completed Goals:")

  for (const goalItem of completedGoalsList) {
    console.log(goalItem.value)
  }
  // await select({
  //   message: "Completed goals",
  //   choices: [...completedGoalsList]
  // })
}

start()