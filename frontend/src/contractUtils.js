import TodoList from "./chain-info/contracts/TodoList.json"
import networkMapping from "./chain-info/deployments/map.json"
import {Contract, providers, utils} from "ethers";

export const getDeployedContract = async () => {
    const {abi} = TodoList
    const provider = new providers.Web3Provider(window.ethereum)
    const {chainId} = await provider.getNetwork()
    // console.log(networkMapping)
    if (!chainId) {// || !networkMapping[String(chainId)]
        return null
    }

    const todoListAddress = networkMapping['dev']["TodoList"][0]//String(chainId)
    const todoListInterface = new utils.Interface(abi)
    const todoListContract = new Contract(todoListAddress, todoListInterface, provider.getSigner())
    // console.log(await todoListContract.deployed())
    return await todoListContract.deployed()
}

export const getTodos = async (contract) => {
    const todos = []
    const count = await contract.todoCount()
    const todoCount = +utils.formatUnits(count, 0)
    for (let i = 1; i <= todoCount; i++) {
        const {id, content, completed} = await contract.getTodo(i)
        todos.push({id: utils.formatUnits(id, 0), content, completed})
    }
    return todos
}

export const createTodo = async (contract, content) => {
    const tx = await contract.createTodo(content)
    await tx.wait(1)
}

export const toggleTodoCompleted = async (contract, id) => {
    const tx = await contract.toggleCompleted(id)
    await tx.wait(1)
}
