App = {
  loading: false,
  contracts: {},
  currentPage: 'landing',

  // ==================== PAGE NAVIGATION ====================
  goToApp: async () => {
    console.log('🚀 Navigating to app...')

    // Set body class to show app page
    document.body.classList.add('showing-app')
    App.currentPage = 'app'

    // Scroll to top
    window.scrollTo(0, 0)

    // Initialize app if not already initialized
    if (!App.account) {
      console.log('📱 Loading blockchain...')
      await App.load()
    } else {
      console.log('📋 Account already connected, rendering tasks...')
      await App.render()
    }
  },

  goToLanding: () => {
    console.log('🏠 Navigating to landing...')

    // Remove body class to show landing page
    document.body.classList.remove('showing-app')
    App.currentPage = 'landing'

    // Scroll to top
    window.scrollTo(0, 0)
  },

  connectWallet: async () => {
    console.log('🔐 Connecting wallet...')

    if (typeof window.ethereum === 'undefined') {
      console.error('❌ MetaMask not installed')
      alert('MetaMask not detected. Installing MetaMask...')
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length === 0) {
        console.error('❌ No accounts found')
        alert('Please unlock MetaMask.')
        return
      }

      App.account = accounts[0]
      window.web3 = new Web3(window.ethereum)

      // Hide connect button, show account
      $('#connectBtn').hide()
      $('#account')
        .text(App.account.slice(0, 6) + '...' + App.account.slice(-4))
        .show()

      console.log('✅ MetaMask Connected:', App.account)

      // Setup event listeners
      App.setupMetaMaskListeners()

      // Load contract for later use
      await App.loadContract()

      alert('Wallet connected successfully! Click "Launch App" to begin.')

    } catch (error) {
      console.error('❌ Connection error:', error)
      if (error.code === -32002) {
        alert('MetaMask request already pending. Check your MetaMask popup.')
      } else {
        alert('Failed to connect wallet: ' + error.message)
      }
    }
  },

  setupMetaMaskListeners: () => {
    console.log('🎧 Setting up MetaMask listeners...')

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('🔄 Account changed:', accounts)
        if (accounts.length === 0) {
          console.log('❌ Wallet disconnected')
          App.account = null
          $('#connectBtn').show()
          $('#account').hide()
          App.goToLanding()
        } else {
          App.account = accounts[0]
          $('#account').text(App.account.slice(0, 6) + '...' + App.account.slice(-4))
          if (App.currentPage === 'app' && App.todoList) {
            App.render()
          }
        }
      })

      window.ethereum.on('chainChanged', () => {
        console.log('🔄 Network changed, reloading...')
        window.location.reload()
      })
    }
  },

  load: async () => {
    console.log('🚀 Starting BlockTodo DApp...')
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask not detected')
      }

      // Initialize web3 if not already initialized
      if (!window.web3) {
        window.web3 = new Web3(window.ethereum)
      }

      await App.loadAccount()
      await App.loadContract()
      await App.render()
    } catch (error) {
      console.error('❌ FATAL ERROR:', error)
      App.setLoading(false)
      window.alert('Error: ' + error.message)
    }
  },

  // ==================== ACCOUNT MANAGEMENT ====================
  loadAccount: async () => {
    console.log('👤 Loading account...')
    try {
      const accounts = await web3.eth.getAccounts()
      if (accounts.length === 0) {
        throw new Error('No accounts found in MetaMask')
      }
      App.account = accounts[0]
      console.log('✅ Account loaded:', App.account)
    } catch (error) {
      console.error('❌ Error loading account:', error)
      throw error
    }
  },

  // ==================== CONTRACT LOADING ====================
  loadContract: async () => {
    console.log('📜 Loading contract...')
    try {
      console.log('📥 Fetching TodoList.json...')
      const response = await fetch('TodoList.json')

      if (!response.ok) {
        throw new Error(
          `Failed to fetch TodoList.json: ${response.status}. ` +
          'Run: truffle migrate --reset --network development'
        )
      }

      const todoListArtifact = await response.json()
      console.log('✅ TodoList.json loaded')

      const TodoListABI = todoListArtifact.abi
      if (!TodoListABI) {
        throw new Error('No ABI found in TodoList.json')
      }

      // Get network ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })

      if (chainId !== '0xaa36a7') {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xaa36a7' }]
          })
        } catch (switchError) {
          throw new Error('Please switch MetaMask to Sepolia network.')
        }
      }

      const networkId = 11155111

      // Force Sepolia
      if (networkId !== 11155111) {
        throw new Error('Please switch MetaMask to Sepolia network.')
      }

      // Get contract address
      if (!todoListArtifact.networks || !todoListArtifact.networks[networkId]) {
        throw new Error(
          `Contract not deployed on network ${networkId}. ` +
          'Run: truffle migrate --reset --network sepolia'
        )
      }

      const contractAddress = todoListArtifact.networks[networkId].address
      console.log('📍 Contract address:', contractAddress)

      // Create contract instance
      App.contracts.TodoList = new web3.eth.Contract(TodoListABI, contractAddress)
      App.todoList = App.contracts.TodoList

      console.log('✅ Contract ready')

      // Setup event listeners
      App.setupContractListeners()

    } catch (error) {
      console.error('❌ Error loading contract:', error)
      throw error
    }
  },

  // ==================== CONTRACT EVENT LISTENERS ====================
  setupContractListeners: async () => {
    console.log('🎧 Setting up event listeners...')
    try {
      if (App.todoList.events && App.todoList.events.taskcreated) {
        App.todoList.events.taskcreated()
          .on('data', (event) => {
            console.log('✨ TaskCreated event:', event.returnValues)
            if (App.currentPage === 'app') {
              App.render()
            }
          })
          .on('error', (error) => {
            console.error('⚠️ taskcreated listener error:', error)
          })
      }

      if (App.todoList.events && App.todoList.events.TaskCompleted) {
        App.todoList.events.TaskCompleted()
          .on('data', (event) => {
            console.log('✅ TaskCompleted event:', event.returnValues)
            if (App.currentPage === 'app') {
              App.render()
            }
          })
          .on('error', (error) => {
            console.error('⚠️ TaskCompleted listener error:', error)
          })
      }

      console.log('✅ Event listeners configured')
    } catch (error) {
      console.warn('⚠️ Could not setup event listeners:', error.message)
    }
  },

  // ==================== RENDERING ====================
  render: async () => {
    console.log('🎨 Rendering UI...')

    if (App.loading) {
      console.log('⏳ Already rendering, skipping')
      return
    }

    App.setLoading(true)

    try {
      console.log('📋 Rendering tasks...')
      await App.renderTasks()
      console.log('✅ Tasks rendered')
    } catch (error) {
      console.error('❌ Error rendering:', error)
      window.alert('Error rendering: ' + error.message)
    }

    App.setLoading(false)
    console.log('✅ Render complete')
  },

  // ==================== RENDER TASKS ====================
  renderTasks: async () => {
    console.log('📊 Starting renderTasks...')

    try {
      console.log('📞 Calling task_count()...')
      const taskCount = await App.todoList.methods.task_count().call()
      console.log('✅ Task count:', taskCount.toString())

      // Clear existing tasks
      $('#taskList').empty()
      $('#completedTaskList').empty()

      const count = parseInt(taskCount)
      if (count === 0) {
        console.log('📭 No tasks, showing empty states')
        $('#taskList').html(`
          <div class="empty-state">
            <span style="font-size:3rem;">📋</span>
            <p>No active quests yet. Start your journey!</p>
          </div>
        `)
        $('#completedTaskList').html(`
          <div class="empty-state">
            <span style="font-size:3rem;">✨</span>
            <p>Your legendary completed quests appear here</p>
          </div>
        `)
        return
      }

      // Fetch and render each task
      console.log(`📥 Fetching ${count} tasks...`)
      for (let i = 1; i <= count; i++) {
        try {
          const task = await App.todoList.methods.tasks(i).call()

          const taskId = parseInt(task.id)
          const taskContent = task.content
          const taskCompleted = task.completed

          console.log(`✅ Task ${i}:`, { taskId, completed: taskCompleted })

          // Create task element
          const $taskTemplate = document.querySelector('#taskTemplate')
          const $newTaskElement = $taskTemplate.content.cloneNode(true)

          // Setup checkbox
          const $checkbox = $newTaskElement.querySelector('.task-checkbox')
          $checkbox.checked = taskCompleted
          $checkbox.setAttribute('data-task-id', taskId)
          $checkbox.addEventListener('change', App.toggleCompleted)

          // Setup content
          $newTaskElement.querySelector('.task-content').textContent = taskContent

          // Add to appropriate list
          const $taskContainer = $newTaskElement.querySelector('.task-item')
          if (taskCompleted) {
            $taskContainer.classList.add('completed')
            document.querySelector('#completedTaskList').appendChild($newTaskElement)
          } else {
            document.querySelector('#taskList').appendChild($newTaskElement)
          }
        } catch (error) {
          console.error(`❌ Error loading task ${i}:`, error)
        }
      }

      console.log(`✅ All ${count} tasks rendered`)
    } catch (error) {
      console.error('❌ Critical error in renderTasks:', error)
      throw error
    }
  },

  // ==================== CREATE TASK ====================
  createTask: async () => {
    const taskContent = $('#newTask').val().trim()

    if (!taskContent) {
      console.warn('⚠️ Empty task input')
      window.alert('Please enter a task.')
      return
    }

    console.log('✍️ Creating task:', taskContent)
    App.setLoading(true)

    try {
      console.log('🔐 Sending transaction...')
      const txHash = await App.todoList.methods
        .createTask(taskContent)
        .send({
          from: App.account,
          gas: 300000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        })

      console.log('✅ Transaction confirmed!')

      // Clear input
      $('#newTask').val('')

      // Wait for confirmation
      console.log('⏳ Waiting 2 seconds...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Re-render
      await App.render()

      console.log('✅ Task created successfully')
    } catch (error) {
      console.error('❌ Error creating task:', error)

      if (error.message.includes('User denied')) {
        window.alert('Transaction cancelled.')
      } else {
        window.alert('Error: ' + error.message)
      }
    } finally {
      App.setLoading(false)
    }
  },

  // ==================== TOGGLE TASK COMPLETION ====================
  toggleCompleted: async (e) => {
    const taskId = parseInt(e.target.getAttribute('data-task-id'))

    if (!taskId) {
      console.error('❌ Invalid task ID')
      return
    }

    console.log('🔄 Toggling task:', taskId)
    App.setLoading(true)

    try {
      const task = await App.todoList.methods.tasks(taskId).call()

      console.log('🔐 Sending toggle transaction...')
      const txHash = await App.todoList.methods
        .toggleTask(taskId)
        .send({
          from: App.account,
          gas: 300000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        })

      console.log('✅ Task toggled!')

      // Wait for confirmation
      console.log('⏳ Waiting 2 seconds...')
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Re-render
      await App.render()

      console.log('✅ Toggle complete')
    } catch (error) {
      console.error('❌ Error toggling task:', error)
      window.alert('Error: ' + error.message)
      e.target.checked = !e.target.checked
    } finally {
      App.setLoading(false)
    }
  },

  // ==================== UI STATE MANAGEMENT ====================
  setLoading: (boolean) => {
    App.loading = boolean

    if (boolean) {
      console.log('⏳ Loading...')
      $('#loader').show()
      $('#content').hide()
    } else {
      console.log('✅ Loading done')
      $('#loader').hide()
      $('#content').show()
    }
  }
}

// ==================== PAGE INITIALIZATION ====================
$(() => {
  console.log('📄 BlockTodo loaded')
  console.log('💡 Click "Connect MetaMask" then "Launch App"')
})

// Make App global
window.App = App

console.log('✅ app.js ready')