import React, { Component } from 'react';
import Proptypes from 'prop-types';
import gh, { USER_CREDENTIALS } from '../../../helpers/githubApi';
import { getJSON } from '../../../helpers';
import Styles from './styles.scss';

export class EditForm extends Component {
    constructor (props) {
        super();
        this.state = {
            description: props.repo.description,
            homepage: props.repo.homepage,
            name: props.repo.name
        }
    }

    static propTypes = {
        onClick: Proptypes.func.isRequired,
        repo: Proptypes.object.isRequired,
        onRepoChange: Proptypes.func.isRequired
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.setState({
    //     //     description: nextProps.description,
    //     //     homepage: nextProps.homepage,
    //     //     name: nextProps.name
    //     // });
    // }

    inputHandler = ({ target }) => {
        const { name, value } = target;

        this.setState({ [name]: value });
    }

    saveChanges = (event) => {
        event.preventDefault();
        const repoActions = gh.getRepo(`${USER_CREDENTIALS.userName}/${this.props.repo.name}`);
        repoActions.updateRepository(this.state).then((result) => {
            this.props.onRepoChange(result.data)
            this.props.onClick()
        });
    }

    render () {
        return (
            <section>
                <form className = { Styles.editRepoForm }>
                    <div className = { Styles.editRepoFormInputs }>
                        <label htmlFor = 'repoDescription'>Description</label>
                        <input name = 'description' value = { this.state.description } type = 'text' className = { Styles.repoDescription } onChange = { this.inputHandler } />
                    </div>
                    <div className = { Styles.editRepoFormInputs }>
                        <label htmlFor = 'repoWebsite'>Website </label>
                        <input name = 'homepage' type = 'text' value = { this.state.homepage } className = { Styles.repoWebsite } onChange = { this.inputHandler } />
                    </div>
                    <div className = { Styles.btnGroup }>
                        <button className = { `${Styles.successBtn} btn-success btn` } onClick = { this.saveChanges }>Save</button>
                        <button className = 'btn-default btn' onClick = { this.props.onClick }>Cancel</button>
                    </div>
                </form>
            </section>
        )
    }
}

