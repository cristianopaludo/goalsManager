const { select, input } = require('@inquirer/prompts')

let goalsList = []

const start = async () => {

  while(true) {
    const selectedOption = await select({
      message: "Menu >",
      choices: [
        { name: "Create goals",         value: "createGoals"        },
        { name: "Show pending goals",   value: "pendingGoals"   },
        { name: "Show completed goals", value: "completedGoals" },
        { name: "Delete goals",         value: "deleteGoals"        },
        { name: "Exit Menu",            value: "exitMenu"           },
      ]
    })

    console.clear()
    
    switch (selectedOption) {
      case "createGoals":
        await createGoals()
        break
      case "pendingGoals":
        await pendingGoals()
        break
      case "completedGoals":
        completedGoals()
        break
      case "deleteGoals":
        console.log("Delete Goals")
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
  
  let completedGoalsList = []

  goalsList.forEach(goal => {
    if (goal.checked) {
      completedGoalsList.push(goal)
    }
  })

  if (completedGoalsList.length <= 0) {
    console.log("There are no completed goals.")
    return
  }

  console.log("Completed Goals:")

  for (const goalItem of completedGoalsList) {
    console.log(goalItem.value)
  }
}

start()