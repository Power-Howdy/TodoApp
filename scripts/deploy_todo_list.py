from brownie import TodoList, network, config
from scripts.helpful_scripts import get_account
from brownie.network import priority_fee

def deploy_todo_list():
    priority_fee('0.1 gwei')
    account = get_account()
    todo_list = TodoList.deploy(
        {"from": account}
    )

    return todo_list

def main():
    deploy_todo_list()
