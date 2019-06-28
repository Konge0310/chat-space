class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(id: message.id)
  end
end