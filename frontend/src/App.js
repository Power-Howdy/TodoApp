import React, {useState, useRef, useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import classNames from 'classnames';

import {lightTheme, darkTheme} from './themes.js';
import GlobalStyles from "./components/styled/Global";
import {StyledMain} from './components/styled/Main.styled.js';
import {StyledBanner} from './components/styled/Banner.styled.js';
import Header from './components/Header';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilters from './components/TodoFilters.js';
import {useEthers} from "@usedapp/core";

import {getDeployedContract, getTodos, createTodo, toggleTodoCompleted} from "./contractUtils";
import {providers} from "ethers";

function App() {
    const [contract, setContract] = useState(null);
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [allFilterActive, setAllFilterActive] = useState(true);
    const [activeFilterActive, setActiveFilterActive] = useState(false);
    const [completedFilterActive, setCompletedFilterActive] = useState(false);

    const {account, activateBrowserWallet, chainId} = useEthers()

    const isConnected = account !== undefined

    const newTodoInput = useRef();

    const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
    const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;

    const [colorTheme, setColorTheme] = useState('light');

    useEffect(() => {
        const provider = new providers.Web3Provider(window.ethereum, "any");
        provider.on("network", (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
                window.location.reload();
            }
        });
    }, [])

    useEffect(() => {
        if (!account || contract)
            return
        getDeployedContract().then(contract => {
            if (contract) {
                setContract(contract)
            } else {
                console.log('Not connected to Ganache Test Network')
            }
        })
    }, [account, chainId])

    useEffect(() => {
        if (!contract)
            return
        getTodos(contract).then(todos => {
            setTodos(todos);
            setFilter('all');
            setFilteredTodos(todos);
        })
    }, [contract])

    function handleAddTodo() {
        const todoContent = newTodoInput.current.value;
        if (todoContent === "") {
            return;
        }
        createTodo(contract, todoContent).then(() => {
            window.location.reload()
        })
    }

    function toggleTodo(id) {
        toggleTodoCompleted(contract, id).then(() => {
            window.location.reload()
        })
    }

    function handleClear() {
        const remainingTodos = todos.filter(todo => !todo.completed);
        setTodos(remainingTodos);
    }

    function countRemaining() {
        const count = todos.filter(todo => !todo.completed);

        if (count.length === 1) {
            return `1 item left`;
        } else {
            return `${count.length} items left`;
        }
    }

    // CHANGE LIST DISPLAYED BASED ON FILTER
    useEffect(() => {
        filterList();
    }, [todos, filter])

    function filterList() {
        if (filter === 'all') {
            setFilteredTodos(todos);
            setAllFilterActive(true);
            setActiveFilterActive(false);
            setCompletedFilterActive(false);
        } else if (filter === 'active') {
            const activeTodos = todos.filter(todo => !todo.completed);
            setFilteredTodos(activeTodos);
            setActiveFilterActive(true);
            setAllFilterActive(false);
            setCompletedFilterActive(false);
        } else if (filter === 'completed') {
            const completedTodos = todos.filter(todo => todo.completed);
            setFilteredTodos(completedTodos);
            setCompletedFilterActive(true);
            setAllFilterActive(false);
            setActiveFilterActive(false);
        }
    }

    // TOGGLE THEME COLORS
    function toggleTheme(e) {
        if (colorTheme === "dark") {
            setColorTheme('light');
            e.target.parentElement.innerHTML = moon;
        } else if (colorTheme === 'light') {
            setColorTheme('dark');
            e.target.parentElement.innerHTML = sun;
        }
    }


    return (
        <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme}>
            <StyledMain>
                <GlobalStyles/>

                <StyledBanner/>
                <Header toggleTheme={toggleTheme}/>

                {
                    isConnected
                        ? <>
                            <TodoInput newTodoInput={newTodoInput} handleAddTodo={handleAddTodo}/>

                            <TodoList todos={filteredTodos} toggleTodo={toggleTodo} classNames={classNames}/>

                            <TodoFilters
                                countRemaining={countRemaining}
                                setFilter={setFilter}
                                handleClear={handleClear}
                                allFilterActive={allFilterActive}
                                activeFilterActive={activeFilterActive}
                                completedFilterActive={completedFilterActive}
                            />
                        </>
                        : <div style={{textAlign: "center"}}>
                            <br/>
                            <p style={{color: "white", fontSize: "24px"}}>
                                Connect to your Metamask wallet
                            </p>
                            <br/><br/>
                            <u className="connect" onClick={activateBrowserWallet}>Connect</u>
                        </div>
                }

            </StyledMain>
        </ThemeProvider>
    );
}

export default App;
