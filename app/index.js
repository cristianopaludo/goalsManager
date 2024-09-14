const { select } = require('@inquirer/prompts')

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

        switch (selectedOption) {
            case "createGoals":
                console.log("Create goal")
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

start()