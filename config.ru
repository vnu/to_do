require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require "sinatra/json"
require 'haml'
require './application'

set :environment, :development
set :run, false
set :raise_errors, true
set :logging, true
set :sessions, true

run Sinatra::Application
