/*
 * Font Scaler - A GNOME Shell extension.
 * Copyright (C) 2018 Patrick Gaubatz <patrick@gaubatz.at>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

'use strict'

const Lang = imports.lang
const Gio = imports.gi.Gio
const St = imports.gi.St
const Gtk = imports.gi.Gtk
const Main = imports.ui.main
const PanelMenu = imports.ui.panelMenu

const KEY = 'text-scaling-factor'
const NAME = 'Font Scaler'
const ICON = 'icon'

let settings
let instance

const FontScaler = new Lang.Class({
  Name: NAME,
  Extends: PanelMenu.Button,
  _init: function () {
    this.parent(null, NAME)
    this.settings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface' })
    this._icon = new St.Icon({
      icon_name: ICON,
      style_class: 'system-status-icon'
    })
    this.actor.add_actor(this._icon)
    this.actor.add_style_class_name('panel-status-button')
    this.actor.connect('button-press-event', Lang.bind(this, this.toggle))
  },
  toggle: function () {
    const value = this.settings.get_double(KEY) === 1 ? 1.3 : 1
    this.settings.set_double(KEY, value)
  }
})

function init(extensionMeta) {
  const theme = Gtk.IconTheme.get_default()
  theme.append_search_path(extensionMeta.path + '/icons')
}

function enable() {
  instance = new FontScaler()
  Main.panel.addToStatusArea(NAME, instance)
}

function disable() {
  instance.destroy()
  instance = null
}
