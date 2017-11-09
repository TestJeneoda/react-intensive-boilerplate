import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Dropdown } from '../../Dropdown';
import gh from '../../../helpers/githubApi';
import Styles from './styles.scss';
import { newProjectDropDownValues } from '../../Dropdown/dropdownValues';
import lock from '../../../theme/assets/lock.png';
import book from '../../../theme/assets/repo.png';
import { getGitignoreOptions, getLicenseOptions } from '../../../actions';

export const { gitIgnore, license } = newProjectDropDownValues;

export class CreateRepo extends Component {

    static propTypes = {
        changePage: Proptypes.func.isRequired,
        userName:   Proptypes.string.isRequired
    }

    state = {
        isFormDisabled:   true,
        gitIgnoreOptions: [],
        licenseOptions:   [],
        newRepoForm:      {
            'auto_init': 0,
            owner:       this.props.userName,
            name:        '',
            description: '',
            public:      true
        },
        validation: 0
    }

    componentWillMount () {
        getGitignoreOptions().then((gitIgnoreOptions) => this.setState({ gitIgnoreOptions })).catch((e) => console.log(e));
        getLicenseOptions().then((licenseOptions) => {
            const options = licenseOptions.map((licenseOption) => ({ value: licenseOption.key, text: licenseOption.name }));

            this.setState({ licenseOptions: options });
        }).catch((e) => console.log(e));
    }

    setInputValueHandler = ({ target }) => {
        this.setState({ validation: 0 });

        if (target.name === 'name') {
            this.setState({ isFormDisabled: !target.value.length > 0 });
        }

        if (target.type === 'checkbox') {
            const value = Number(!this.state.newRepoForm.auto_init);

            this.formElementHandler(target.name, value);

            return;
        }
        this.formElementHandler(target.name, target.value);
    }

    setRadioBtnHandler = ({ target }) => {
        const { name, value } = target;

        this.formElementHandler(name, Boolean(Number(value)));
    }

    createRepo = (event) => {
        event.preventDefault();
        const newRepo = this.state.newRepoForm;
        const { changePage, userName } = this.props;
        const repoOwner = gh.getUser(userName);

        repoOwner.createRepo(newRepo).then(({ status, data }) => {
            if (status === 201) {
                changePage('Repo', data);
            }
        }).catch((error) => {
            this.setState({
                validation:     'Repository with this name already exists',
                isFormDisabled: true
            });
            console.log(error.message);
        });
    }

    formElementHandler = (name, value) => {
        const newForm = Object.assign({}, this.state.newRepoForm, { [name]: value });

        this.setState({ newRepoForm: newForm });
    }

    render () {

        const { license_template: licenseTemplate = '', gitignore_template: gitignoreTemplate = '', public: publicField } = this.state.newRepoForm;
        const { validation, licenseOptions, gitIgnoreOptions } = this.state;
        const validationMessage = validation ? <p>{validation}</p> : null;

        return (
            <div className = { Styles.projectForm } >
                <form>
                    <div className = { Styles.formRow }>
                        <h1>Create a new repository</h1>
                        <p>A repository contains all the files for your project, including the revision history.</p>
                    </div>
                    <div className = { Styles.repositoryPath }>
                        <div className = 'form-group'>
                            <label htmlFor = 'exampleInputEmail1'>Owner</label>
                            <input
                                disabled
                                className = 'form-control'
                                id = 'exampleInputEmail1'
                                type = 'text'
                                value = { this.props.userName }
                            />
                            <span> / </span>
                        </div>
                        <div className = 'form-group'>
                            <label htmlFor = 'exampleInputPassword1'>Repository name</label>
                            <input
                                className = 'form-control'
                                name = 'name'
                                type = 'text'
                                onChange = { this.setInputValueHandler }
                            />
                        </div>
                    </div>
                    <p>Great repository names are short and memorable. Need inspiration? How about
                        cautious-umbrella.</p>
                    <div className = { `${Styles.description} form-group` }>
                        <label htmlFor = 'exampleInputPassword1'>Description (optional)</label>
                        <input
                            className = 'form-control'
                            name = 'description'
                            type = 'text'
                            onChange = { this.setInputValueHandler }
                        />
                    </div>
                    <div className = { Styles.repoTypeRow }>
                        <div className = 'radio'>
                            <label>
                                <input
                                    checked = { publicField }
                                    name = 'public'
                                    type = 'radio'
                                    value = '1'
                                    onChange = { this.setRadioBtnHandler }
                                />
                                <p><img className = { Styles.publicImg } src = { book } />Public</p>
                                <p>Option one is this and that&mdash;be sure to include why it is great</p>
                            </label>
                        </div>
                        <div className = 'radio'>
                            <label>
                                <input
                                    checked = { !publicField }
                                    name = 'public'
                                    type = 'radio'
                                    value = '0'
                                    onChange = { this.setRadioBtnHandler }
                                />
                                <p><img className = { Styles.privateImg } src = { lock } />Private</p>
                                <p>Option one is this and that&mdash;be sure to include why it is great</p>
                            </label>
                        </div>
                    </div>
                    <div className = { Styles.readmeInitRow }>
                        <div className = 'checkbox'>
                            <label className = 'checkbox-inline'>
                                <input
                                    id = 'readmeInit'
                                    name = 'auto_init'
                                    type = 'checkbox'
                                    onChange = { this.setInputValueHandler }
                                />
                                Initialize this repository with a README
                                <p>This will let you immediately clone the repository to your computer. Skip this step
                                    if you’re importing an existing repository.</p>
                            </label>
                        </div>
                        <div className = { Styles.footerDropDowns }>
                            <Dropdown
                                data = { gitIgnore }
                                options = { gitIgnoreOptions }
                                value = { gitignoreTemplate }
                                onChange = { this.formElementHandler }
                            />
                            <span>|</span>
                            <Dropdown
                                data = { license }
                                options = { licenseOptions }
                                value = { licenseTemplate }
                                onChange = { this.formElementHandler }
                            />
                            <i aria-hidden = 'true' className = 'fa fa-info-circle' />
                        </div>
                    </div>
                    <button
                        className = 'btn btn-success'
                        disabled = { this.state.isFormDisabled }
                        type = 'submit'
                        validation = { validation }
                        onClick = { this.createRepo }>
                        Create repository</button>{validationMessage}
                </form>
            </div>
        );
    }
}
