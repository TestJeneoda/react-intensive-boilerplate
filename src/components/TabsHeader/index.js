import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Styles from './styles.scss';
import { EditForm } from '../Pages/Project/EditForm';

const CreateButtonGrp = (props) => {
    return props.buttons.map((button, key) =>
        <button className = { button.className + ' btn' } key = { key } type = 'button' onClick = { button.onClick }>{button.text}</button>)
}

export class TabsHeader extends Component {

    static propTypes = {
        activeTab:       Proptypes.bool.isRequired,
        buttons:         Proptypes.array.isRequired,
        changeActiveTab: Proptypes.func.isRequired,
        description:     Proptypes.string.isRequired,
        isComponentActive: Proptypes.bool,
        replaceableComponent: Proptypes.element
    }

    // createButtonGroup = (buttons) => {
    //     return buttons.map((button, key) => <button className = 'btn btn-primary' key = { key } type = 'button'>{button}</button>)
    // };

    render () {
        const { activeTab, description, buttons, isComponentActive, replaceableComponent } = this.props;

        return (
            activeTab ? (isComponentActive ? replaceableComponent : <section className = { Styles.description }>
                <div className = { Styles.title }>{description}</div>
                <div className = { Styles.buttons }>
                    {/*{this.createButtonGroup(buttons)}*/}
                    <CreateButtonGrp
                        buttons = { buttons }
                        replaceableComponent = { replaceableComponent }
                    />
                </div>
            </section>) : null
        )
    }

}
