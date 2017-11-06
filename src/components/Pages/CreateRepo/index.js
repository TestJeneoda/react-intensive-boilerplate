import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
import { REPO_OWNER, GITHUB_URL } from '../../../constants';
import book from '../../../theme/assets/repo.png';
import lock from '../../../theme/assets/lock.png';
import { Dropdown } from '../../Dropdown';
import { newProjectDropdownValues } from '../../Dropdown/dropdownValues';
const { gitignore, license } = newProjectDropdownValues;
import gh from '../../../helpers/githubApi';

const TEMP_DATA = {
    licenses: [
        {
            "key": "mit",
            "name": "MIT License",
            "spdx_id": "MIT",
            "url": "https://api.github.com/licenses/mit",
            "featured": true
        },
        {
            "key": "lgpl-3.0",
            "name": "GNU Lesser General Public License v3.0",
            "spdx_id": "LGPL-3.0",
            "url": "https://api.github.com/licenses/lgpl-3.0",
            "featured": false
        },
        {
            "key": "mpl-2.0",
            "name": "Mozilla Public License 2.0",
            "spdx_id": "MPL-2.0",
            "url": "https://api.github.com/licenses/mpl-2.0",
            "featured": false
        },
        {
            "key": "agpl-3.0",
            "name": "GNU Affero General Public License v3.0",
            "spdx_id": "AGPL-3.0",
            "url": "https://api.github.com/licenses/agpl-3.0",
            "featured": false
        },
        {
            "key": "unlicense",
            "name": "The Unlicense",
            "spdx_id": "Unlicense",
            "url": "https://api.github.com/licenses/unlicense",
            "featured": false
        },
        {
            "key": "apache-2.0",
            "name": "Apache License 2.0",
            "spdx_id": "Apache-2.0",
            "url": "https://api.github.com/licenses/apache-2.0",
            "featured": true
        },
        {
            "key": "gpl-3.0",
            "name": "GNU General Public License v3.0",
            "spdx_id": "GPL-3.0",
            "url": "https://api.github.com/licenses/gpl-3.0",
            "featured": true
        }
    ],
    gitignore: [
        "Actionscript",
        "Android",
        "AppceleratorTitanium",
        "Autotools",
        "Bancha",
        "C",
        "C++"
    ]
}

import { getJSON } from '../../../helpers';
import { USER_CREDENTIALS } from '../../../helpers/githubApi';
export class CreateRepo extends Component {

    static propTypes = {
        changePage: Proptypes.func.isRequired,
        goToRepo:   Proptypes.func.isRequired,
        repos:      Proptypes.array.isRequired,
        userName:   Proptypes.string.isRequired
    }

    state = {
        isFormDisabled:        true,
        gitignoreOptions: [],
        licenseOptions:   [],
        newRepoForm: {
            auto_init:          0,
            owner:              this.props.userName,
            name:               '',
            description:        '',
            public:             true
        },
        validation: 0
    }

    getGitignoreOptions = () => this.setState({ gitignoreOptions: TEMP_DATA.gitignore })
        // fetch(`${GITHUB_URL}/gitignore/templates`)
        // .then(getJSON)
        // .then((gitignoreOptions) => this.setState({ gitignoreOptions }))
        // .catch((e) => console.log(e));

    getLicenseOptions = () => this.setState({ licenseOptions: TEMP_DATA.licenses.map(({key, name}) => ({value: key, text: name}))})
        // fetch(`${GITHUB_URL}/licenses`)
        // .then(getJSON)
        // .then((licenseOptions) => this.setState({ licenseOptions }))
        // .catch((e) => console.log(e));

    componentWillMount () {
        this.getGitignoreOptions();
        this.getLicenseOptions();
    }

    setInputValueHandler = ({ target }) => {
        this.setState({ validation: 0 });
        const { repos } = this.props;
        const repoNameDuplicate = repos.find(({ name }) => name === target.value);


        if (target.name === 'name') {
            this.setState({ isFormDisabled: !target.value.length > 0 });
        }

        if (repoNameDuplicate) {
            this.setState({
                validation:     'Repository with this name already exists',
                isFormDisabled: true });
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

        this.formElementHandler(name, Boolean(+value));
    }

    createRepo = (event) => {
        event.preventDefault();
        const newRepo = this.state.newRepoForm;
        const repoOwner = gh.getUser(this.props.userName);
        const { goToRepo } = this.props;

        // console.log(gh.getRepo);
        repoOwner.createRepo(newRepo).then(({ status, data }) => {
            if (status === 201) {
                goToRepo(data);
            }
        }).catch((error) => console.log(error.message));
    }

    formElementHandler = (name, value) => {
        const newForm = Object.assign({}, this.state.newRepoForm, { [name]: value });

        this.setState({ newRepoForm: newForm });
    }

    render () {
        //console.log(gh.getRepo);
        const { license_template = '', gitignore_template = '', public:publicField } = this.state.newRepoForm;
        const { validation } = this.state;
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
                            <input disabled className = 'form-control' id = 'exampleInputEmail1' type = 'text' value = { this.props.userName } />
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
                                    checked={publicField}
                                    name = 'public'
                                    type = 'radio'
                                    value = '1'
                                    onChange = { this.setRadioBtnHandler }
                                />
                                <p><img className = { Styles.publicImg } src = { book } />Public</p>
                                <p>Option one is this and that&mdash;be sure to include why it's great</p>
                            </label>
                        </div>
                        <div className = 'radio'>
                            <label>
                                <input
                                    checked={!publicField}
                                    name = 'public'
                                    type = 'radio'
                                    value = '0'
                                    onChange = { this.setRadioBtnHandler }
                                />
                                <p><img className = { Styles.privateImg } src = { lock } />Private</p>
                                <p>Option one is this and that&mdash;be sure to include why it's great</p>
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
                                data = { gitignore }
                                value = { gitignore_template }
                                options = { this.state.gitignoreOptions }
                                onChange = { this.formElementHandler }
                            />
                            <span>|</span>
                            <Dropdown
                                data = { license }
                                value = { license_template }
                                options = { this.state.licenseOptions }
                                onChange = { this.formElementHandler }
                            />
                            <i aria-hidden = 'true' className = 'fa fa-info-circle' />
                        </div>
                    </div>
                    <button
                        disabled = { this.state.isFormDisabled }
                        validation = { this.state.validation }
                        className = 'btn btn-success'
                        type = 'submit'
                        onClick = { this.createRepo }>
                        Create repository</button>{validationMessage}
                </form>
            </div>
        )
    }

}

