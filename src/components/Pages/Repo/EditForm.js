import React, { Component } from 'react';
import Proptypes from 'prop-types';
import gh, { USER_CREDENTIALS } from '../../../helpers/githubApi';
import Styles from './styles.scss';

export class EditForm extends Component {
    static propTypes = {
        repo:         Proptypes.object.isRequired,
        onClick:      Proptypes.func.isRequired,
        onRepoChange: Proptypes.func.isRequired
    }

    constructor (props) {
        super();
        this.state = {
            description: props.repo.description,
            homepage:    props.repo.homepage,
            name:        props.repo.name
        };
    }

    inputHandler = ({ target }) => {
        const { name, value } = target;

        this.setState({ [name]: value });
    }

    saveChanges = (event) => {
        event.preventDefault();
        const repoActions = gh.getRepo(`${USER_CREDENTIALS.userName}/${this.props.repo.name}`);

        repoActions.updateRepository(this.state).then((result) => {
            this.props.onRepoChange(result.data);
            this.props.onClick();
        });
    }

    render () {
        const { homepage, description } = this.state;

        return (
            <section>
                <form className = { Styles.editRepoForm }>
                    <div className = { Styles.editRepoFormInputs }>
                        <label htmlFor = 'repoDescription'>Description</label>
                        <input
                            className = { Styles.repoDescription }
                            name = 'description'
                            type = 'text'
                            value = { description }
                            onChange = { this.inputHandler }
                        />
                    </div>
                    <div className = { Styles.editRepoFormInputs }>
                        <label htmlFor = 'repoWebsite'>Website </label>
                        <input
                            className = { Styles.repoWebsite }
                            name = 'homepage'
                            type = 'text'
                            value = { homepage }
                            onChange = { this.inputHandler }
                        />
                    </div>
                    <div className = { Styles.btnGroup }>
                        <button className = { `${Styles.successBtn} btn-success btn` } onClick = { this.saveChanges }>Save</button>
                        <button className = 'btn-default btn' onClick = { this.props.onClick }>Cancel</button>
                    </div>
                </form>
            </section>
        );
    }
}
