struct RNGPathCommand {
    var command: Character
    var values: Array<Float>

    init(command: Character, values: Array<Float>) {
        self.command = command
        self.values = values
    }

    func toString() -> String {
        return "\(command) \(values)"
    }
}
