const { select, input } = require('@inquirer/prompts')

let goalsList = []

const start = async () => {

  while(true) {
    const selectedOption = await select({
      message: "Menu >",
      choices: [
        { name: "Create goals",         value: "createGoals"        },
        { name: "List Pending goals",   value: "listPendingGoals"   },
        { name: "List Completed goals", value: "listCompletedGoals" },
        { name: "Delete goals",         value: "deleteGoals"        },
        { name: "Exit Menu",            value: "exitMenu"           },
      ]
    })

    console.clear()
    
    switch (selectedOption) {
      case "createGoals":
        await createGoals()
        break
      case "listPendingGoals":
        console.log("List Pending Goals")
        break
      case "listCompletedGoals":
        console.log("List Completed Goals")
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

start()