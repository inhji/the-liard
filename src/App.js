import React, { Component } from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'
import { requestGameLoop, store } from './gameloop'

import Houses from './components/Houses'
import Resources from './components/Resources'
import BuildQueue from './components/BuildQueue'
import Laird from './components/Laird'
import Loans from './components/Loans'

import './App.css'

@observer
class App extends Component {
	componentDidMount() {
		requestGameLoop()
	}

	render() {
		if (!store) {
			return <div>loading..</div>
		}

		// Data
		const { ticks, houses, resources, buildQueue, laird, loans, messages } = store.state

		// Actions
		const { build, takeLoan } = store

		// Getters
		const { queueEmpty } = store

		return (
			<div>
				<pre>Console: {_.last(messages) || 'Nothing to report'}</pre>
				<section className="section">
					<div className="container">
						<div>
							Ticks: {ticks}, Time: {Math.round(ticks / 60)}s
						</div>

						<div className="columns">
							<div className="column is-one-third">
								<h3 className="is-size-5">Buildings</h3>

								<Houses houses={houses} build={build} />
							</div>

							<div className="column is-two-thirds columns">
								<div className="column is-one-quarter">
									<h3 className="is-size-5">Build Queue</h3>

									<BuildQueue queue={buildQueue} isEmpty={queueEmpty} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">Resources</h3>

									<Resources resources={resources} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">The Laird</h3>

									<Laird laird={laird} />
								</div>

								<div className="column is-one-quarter">
									<h3 className="is-size-5">Loans</h3>

									<Loans loans={loans} takeLoan={takeLoan} />
								</div>
							</div>
						</div>
					</div>
				</section>

				<pre>{JSON.stringify(store.state, null, 4)}</pre>
			</div>
		)
	}
}

export default App
