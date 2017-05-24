'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./index.less');
var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('prop-types');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tabpane = require('./tabpane');

var _tabpane2 = _interopRequireDefault(_tabpane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * tab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 导航tab
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 调用方式:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <Tabs defaultActiveKey="1" type="nav|capsule" centered onChange={callback}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     <TabPane tab="选项一" key="1">选项一的内容~~</TabPane>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     <TabPane tab="选项二" key="2">选项二的内容 ~~</TabPane>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     <a tab="链接一" href="">链接一</a>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * </Tabs>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var tab_types = { nav: true, capsule: true, app: true };

var Tabs = function (_Component) {
    _inherits(Tabs, _Component);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var activeKey = undefined;

        if ('defaultActiveKey' in props) {
            activeKey = props.defaultActiveKey;
        } else {
            activeKey = _this.getDefaultActiveKey();
        }

        _this.state = { activeKey: activeKey };

        // bind function scope
        _this.handleTabClick = _this.handleTabClick.bind(_this);
        return _this;
    }

    Tabs.prototype.getDefaultActiveKey = function getDefaultActiveKey() {
        var key = undefined;
        // 默认选中第一个带有key的节点
        _react2.default.Children.forEach(this.props.children, function (child) {
            if (key === undefined && child.key) {
                key = child.key;
            }
        });
        return key;
    };

    Tabs.prototype.handleTabClick = function handleTabClick(e, child) {
        e.preventDefault();
        this.setState({ activeKey: child.key });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(child.key, child);
        }
    };

    Tabs.prototype.render = function render() {
        var _classNames,
            _this2 = this;

        var _props = this.props;
        var className = _props.className;
        var children = _props.children;
        var type = _props.type;
        var defaultActiveKey = _props.defaultActiveKey;
        var centered = _props.centered;

        var others = _objectWithoutProperties(_props, ['className', 'children', 'type', 'defaultActiveKey', 'centered']);

        var clazz = (0, _classnames2.default)(className, 'tabs', (_classNames = {}, _defineProperty(_classNames, 'tabs-' + type, tab_types[type]), _defineProperty(_classNames, 'tabs-center', type === 'capsule' && centered), _classNames));

        var tabsInner = [],
            tabContent = [];

        _react2.default.Children.forEach(children, function (child, i) {
            var _child$props = child.props;
            var className = _child$props.className;
            var children = _child$props.children;
            var href = _child$props.href;

            var others = _objectWithoutProperties(_child$props, ['className', 'children', 'href']);

            var activeClass = _this2.state.activeKey === child.key ? 'active' : null;
            var clazz = (0, _classnames2.default)(className, activeClass);

            // 有内容的tab
            if (child.type === _tabpane2.default) {

                tabsInner.push(_react2.default.createElement(
                    'a',
                    { key: 'tab-item-' + i, onClick: function onClick(e) {
                            _this2.handleTabClick(e, child);
                        }, className: activeClass },
                    _react2.default.createElement(
                        'span',
                        null,
                        child.props.tab
                    )
                ));

                tabContent.push(_react2.default.createElement(
                    _tabpane2.default,
                    _extends({ key: 'tab-pane-' + i, className: clazz }, others),
                    children
                ));
            } else if (child.type === 'a') {
                // 无内容的tab或链接(取决于有没有key属性)

                tabsInner.push(child.key ? _react2.default.createElement(
                    'a',
                    _extends({ key: 'tab-item-' + i, href: 'javascript:void(0)', onClick: function onClick(e) {
                            _this2.handleTabClick(e, child);
                        }, className: clazz }, others),
                    _react2.default.createElement(
                        'span',
                        null,
                        children
                    )
                ) : _react2.default.createElement(
                    'a',
                    _extends({ key: 'tab-item-' + i, href: href, className: className }, others),
                    _react2.default.createElement(
                        'span',
                        null,
                        children
                    )
                ));
            }
        });

        var innerContent = [_react2.default.createElement(
            'div',
            { className: 'tabs-inner', key: 'tabs-inner' },
            tabsInner
        ), tabContent.length ? _react2.default.createElement(
            'div',
            { className: 'tab-content', key: 'tab-content' },
            tabContent
        ) : null];

        if (type === 'app') {
            innerContent.reverse();
        }

        return _react2.default.createElement(
            'div',
            _extends({ className: clazz }, _objectWithoutProperties(others, ['tab'])),
            innerContent
        );
    };

    return Tabs;
}(_react.Component);

Tabs.propTypes = {
    type:             _PropTypes2.default.string,
    defaultActiveKey: _PropTypes2.default.string,
    centered:         _PropTypes2.default.bool,
    onChange:         _PropTypes2.default.func
};

Tabs.defaultProps = {
    type: 'nav'
};

Tabs.TabPane = _tabpane2.default;

exports.default = Tabs;
module.exports = exports['default'];
